import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { NetworkNode, NetworkEdge, CommunityRecord } from '../types/analytics';
import { ZoomIn, ZoomOut, RotateCcw, Search, Filter, Info, ShieldCheck } from 'lucide-react';

interface Props {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  communities: CommunityRecord[];
  onSelectNode?: (node: NetworkNode) => void;
}

interface SimNode extends NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const NetworkGraph: React.FC<Props> = ({ nodes, edges, communities, onSelectNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<number | 'all'>('all');
  const [sizeMetric, setSizeMetric] = useState<'pageRank' | 'degreeCentrality'>('pageRank');
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<SimNode | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Map nodes to simulation nodes
  const simNodesRef = useRef<SimNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize simulation positions
  useEffect(() => {
    if (!nodes || nodes.length === 0) return;

    const width = 800;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    // Preserve existing positions if possible, or initialize around circle
    const existingMap = new Map(simNodesRef.current.map(n => [n.id, n]));

    simNodesRef.current = nodes.map((node, i) => {
      const existing = existingMap.get(node.id);
      const angle = (i / nodes.length) * 2 * Math.PI;
      const radiusDist = 120 + (i % 3) * 65;

      const metricVal = sizeMetric === 'pageRank' ? node.pageRank : node.degreeCentrality * 10;
      const nodeRadius = Math.max(7, Math.min(22, 6 + metricVal * 2.5));

      return {
        ...node,
        x: existing ? existing.x : centerX + Math.cos(angle) * radiusDist + (Math.random() - 0.5) * 30,
        y: existing ? existing.y : centerY + Math.sin(angle) * radiusDist + (Math.random() - 0.5) * 30,
        vx: 0,
        vy: 0,
        radius: nodeRadius
      };
    });
  }, [nodes, sizeMetric]);

  // Run lightweight iterative force simulation
  useEffect(() => {
    let iteration = 0;
    const maxIterations = 160;

    const runPhysicsStep = () => {
      if (iteration >= maxIterations && !draggedNode) {
        draw();
        return;
      }
      iteration++;

      const simNodes = simNodesRef.current;
      const width = 800;
      const height = 550;
      const cx = width / 2;
      const cy = height / 2;

      // 1. Repulsion between nodes
      for (let i = 0; i < simNodes.length; i++) {
        for (let j = i + 1; j < simNodes.length; j++) {
          const a = simNodes[i];
          const b = simNodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          if (dist < 260) {
            const force = (380 / (distSq + 120)) * 0.45;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (a !== draggedNode) {
              a.vx -= fx;
              a.vy -= fy;
            }
            if (b !== draggedNode) {
              b.vx += fx;
              b.vy += fy;
            }
          }
        }
      }

      // 2. Attraction along edges
      const nodeIndexMap = new Map(simNodes.map(n => [n.id, n]));
      for (const edge of edges) {
        const src = nodeIndexMap.get(edge.source);
        const tgt = nodeIndexMap.get(edge.target);
        if (src && tgt) {
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = 90;
          const force = (dist - targetDist) * 0.005 * Math.min(3, edge.weight);

          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (src !== draggedNode) {
            src.vx += fx;
            src.vy += fy;
          }
          if (tgt !== draggedNode) {
            tgt.vx -= fx;
            tgt.vy -= fy;
          }
        }
      }

      // 3. Center gravity & damping
      for (const n of simNodes) {
        if (n === draggedNode) continue;

        const cdx = cx - n.x;
        const cdy = cy - n.y;
        n.vx += cdx * 0.0015;
        n.vy += cdy * 0.0015;

        // Apply friction
        n.vx *= 0.85;
        n.vy *= 0.85;

        n.x += n.vx;
        n.y += n.vy;
      }

      draw();
      animationFrameRef.current = requestAnimationFrame(runPhysicsStep);
    };

    animationFrameRef.current = requestAnimationFrame(runPhysicsStep);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [edges, draggedNode, zoom, pan, hoveredNode, searchQuery, selectedCommunity]);

  // Canvas drawing routine
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina display scaling
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    // Light canvas background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Apply pan & zoom transform
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.scale(zoom, zoom);
    ctx.translate(-400, -275); // Canvas coordinate space center

    const simNodes = simNodesRef.current;
    const nodeMap = new Map(simNodes.map(n => [n.id, n]));

    // Draw Edges
    for (const edge of edges) {
      const src = nodeMap.get(edge.source);
      const tgt = nodeMap.get(edge.target);
      if (!src || !tgt) continue;

      const isSrcMatch = selectedCommunity === 'all' || src.communityId === selectedCommunity;
      const isTgtMatch = selectedCommunity === 'all' || tgt.communityId === selectedCommunity;

      if (!isSrcMatch && !isTgtMatch) continue;

      const isConnectedToHovered = hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id);

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);

      if (isConnectedToHovered) {
        ctx.strokeStyle = '#7c3aed'; // Purple highlight
        ctx.lineWidth = Math.min(3.5, 1.8 + edge.weight * 0.8);
        ctx.globalAlpha = 0.95;
      } else {
        ctx.strokeStyle = '#cbd5e1'; // Light slate border
        ctx.lineWidth = Math.min(2.5, 1.0 + edge.weight * 0.4);
        ctx.globalAlpha = selectedCommunity === 'all' ? 0.6 : 0.25;
      }
      ctx.stroke();

      // Draw small directional arrow pointer
      if (isConnectedToHovered || edge.weight > 2) {
        const angle = Math.atan2(tgt.y - src.y, tgt.x - src.x);
        const arrowDist = tgt.radius + 6;
        const arrowX = tgt.x - Math.cos(angle) * arrowDist;
        const arrowY = tgt.y - Math.sin(angle) * arrowDist;

        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(angle);
        ctx.fillStyle = isConnectedToHovered ? '#7c3aed' : '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-6, -3);
        ctx.lineTo(-6, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;

    // Draw Nodes
    const query = searchQuery.trim().toLowerCase();

    for (const node of simNodes) {
      const matchesSearch = query ? node.id.includes(query) || node.label.includes(query) : false;
      const matchesComm = selectedCommunity === 'all' || node.communityId === selectedCommunity;
      const isHovered = hoveredNode?.id === node.id;

      let alpha = 1;
      if (selectedCommunity !== 'all' && !matchesComm) {
        alpha = 0.15;
      } else if (query && !matchesSearch) {
        alpha = 0.25;
      }

      ctx.globalAlpha = alpha;

      // Glow halo for top PageRank nodes or searched node
      if (isHovered || matchesSearch || node.pageRank > 8) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 7 : 4), 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? 'rgba(124, 58, 237, 0.25)' : `${node.communityColor}33`;
        ctx.fill();
      }

      // Outer border circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.communityColor;
      ctx.fill();
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.strokeStyle = isHovered ? '#7c3aed' : '#ffffff';
      ctx.stroke();

      // Node label (show always if high rank, hovered, searched, or community filtered)
      const shouldShowLabel = isHovered || matchesSearch || node.pageRank > 6 || selectedCommunity !== 'all' || zoom > 1.3;

      if (shouldShowLabel && alpha > 0.4) {
        ctx.font = isHovered ? 'bold 12px "JetBrains Mono", sans-serif' : '10px "JetBrains Mono", sans-serif';
        ctx.fillStyle = isHovered ? '#6d28d9' : '#0f172a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(`@${node.id}`, node.x, node.y + node.radius + 4);
      }
    }

    ctx.restore();
  }, [zoom, pan, hoveredNode, searchQuery, selectedCommunity, edges]);

  // Redraw on state change
  useEffect(() => {
    draw();
  }, [draw]);

  // Coordinate conversion from screen canvas to graph coordinates
  const getGraphCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const graphX = (mouseX - (width / 2 + pan.x)) / zoom + 400;
    const graphY = (mouseY - (height / 2 + pan.y)) / zoom + 275;

    return { x: graphX, y: graphY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getGraphCoords(e.clientX, e.clientY);

    if (isDragging && !draggedNode) {
      setPan({
        x: pan.x + (e.clientX - dragStart.x),
        y: pan.y + (e.clientY - dragStart.y)
      });
      setDragStart({ x: e.clientX, y: e.clientY });
      return;
    }

    if (draggedNode) {
      draggedNode.x = coords.x;
      draggedNode.y = coords.y;
      draggedNode.vx = 0;
      draggedNode.vy = 0;
      draw();
      return;
    }

    // Check hit test for hovered node
    let found: SimNode | null = null;
    for (const node of simNodesRef.current) {
      const dx = node.x - coords.x;
      const dy = node.y - coords.y;
      if (dx * dx + dy * dy <= (node.radius + 5) * (node.radius + 5)) {
        found = node;
        break;
      }
    }

    setHoveredNode(found);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getGraphCoords(e.clientX, e.clientY);
    let hitNode: SimNode | null = null;

    for (const node of simNodesRef.current) {
      const dx = node.x - coords.x;
      const dy = node.y - coords.y;
      if (dx * dx + dy * dy <= (node.radius + 6) * (node.radius + 6)) {
        hitNode = node;
        break;
      }
    }

    if (hitNode) {
      setDraggedNode(hitNode);
      if (onSelectNode) onSelectNode(hitNode);
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const coords = getGraphCoords(touch.clientX, touch.clientY);
      let hitNode: SimNode | null = null;
      for (const node of simNodesRef.current) {
        const dx = node.x - coords.x;
        const dy = node.y - coords.y;
        if (dx * dx + dy * dy <= (node.radius + 8) * (node.radius + 8)) {
          hitNode = node;
          break;
        }
      }
      if (hitNode) {
        setDraggedNode(hitNode);
        if (onSelectNode) onSelectNode(hitNode);
      } else {
        setIsDragging(true);
        setDragStart({ x: touch.clientX, y: touch.clientY });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const coords = getGraphCoords(touch.clientX, touch.clientY);
      if (isDragging && !draggedNode) {
        setPan({
          x: pan.x + (touch.clientX - dragStart.x),
          y: pan.y + (touch.clientY - dragStart.y)
        });
        setDragStart({ x: touch.clientX, y: touch.clientY });
      } else if (draggedNode) {
        draggedNode.x = coords.x;
        draggedNode.y = coords.y;
        draggedNode.vx = 0;
        draggedNode.vy = 0;
        draw();
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    const newZoom = Math.min(2.8, Math.max(0.5, zoom + delta));
    setZoom(newZoom);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedCommunity('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col shadow-sm">
      {/* Graph Toolbar */}
      <div className="p-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        {/* Search & Community filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user node..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 w-40 sm:w-48 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <span className="text-[11px] text-slate-500 px-1 font-semibold flex items-center gap-1">
              <Filter className="w-3 h-3 text-purple-600" /> Cluster:
            </span>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              aria-label="Filter by Community Cluster"
              className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-hidden cursor-pointer pr-1"
            >
              <option value="all">All Clusters ({communities.length})</option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.size} users)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 text-xs shadow-2xs">
            <button
              onClick={() => setSizeMetric('pageRank')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                sizeMetric === 'pageRank' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Size: PageRank
            </button>
            <button
              onClick={() => setSizeMetric('degreeCentrality')}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                sizeMetric === 'degreeCentrality' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Size: Centrality
            </button>
          </div>
        </div>

        {/* Zoom & Viewport Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom(z => Math.min(2.8, z + 0.2))}
            aria-label="Zoom In"
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}
            aria-label="Zoom Out"
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            aria-label="Reset Viewport"
            className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-slate-500 font-mono font-semibold pl-1">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-[520px] bg-slate-50 cursor-grab active:cursor-grabbing select-none overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className="w-full h-full block touch-none"
        />

        {/* Hover Node Tooltip Card */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 max-w-xs bg-white/95 backdrop-blur-md border border-purple-200 rounded-2xl p-3.5 shadow-xl pointer-events-none transition-all">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-slate-900">@{hoveredNode.id}</span>
              <span
                className="w-3 h-3 rounded-full border border-white shadow-2xs"
                style={{ backgroundColor: hoveredNode.communityColor }}
                title={`Community ${hoveredNode.communityId}`}
              />
            </div>
            <div className="text-[11px] text-slate-500 mb-2 font-medium">
              Cluster: <span className="text-slate-800 font-semibold">{communities[hoveredNode.communityId]?.name || `Community ${hoveredNode.communityId}`}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] border-t border-slate-100 pt-2 font-mono">
              <div>
                <span className="text-slate-400">PageRank:</span>{' '}
                <span className="text-purple-700 font-bold">{hoveredNode.pageRank.toFixed(3)}%</span>
              </div>
              <div>
                <span className="text-slate-400">Centrality:</span>{' '}
                <span className="text-blue-700 font-bold">{hoveredNode.degreeCentrality.toFixed(4)}</span>
              </div>
              <div>
                <span className="text-slate-400">In-degree:</span>{' '}
                <span className="text-emerald-700 font-bold">{hoveredNode.inDegree}</span>
              </div>
              <div>
                <span className="text-slate-400">Out-degree:</span>{' '}
                <span className="text-amber-700 font-bold">{hoveredNode.outDegree}</span>
              </div>
            </div>
          </div>
        )}

        {/* Graph Legend Overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-3 text-[11px] text-slate-700 max-w-[210px] hidden sm:block shadow-sm">
          <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-purple-600" /> Graph Interpretation
          </div>
          <div className="space-y-1 text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <span>Node: Twitter user</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-slate-400"></span>
              <span>Directed Edge: @mention</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-purple-500"></span>
              <span>Radius: {sizeMetric === 'pageRank' ? 'PageRank' : 'Degree'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Pills Bar */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-xs flex flex-wrap items-center gap-2 overflow-x-auto">
        <span className="text-slate-500 text-[11px] font-semibold shrink-0">Communities:</span>
        {communities.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCommunity(selectedCommunity === c.id ? 'all' : c.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              selectedCommunity === c.id
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full border border-white" style={{ backgroundColor: c.color }} />
            <span>{c.name}</span>
            <span className={selectedCommunity === c.id ? 'text-white/80' : 'text-slate-400'}>({c.size})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
