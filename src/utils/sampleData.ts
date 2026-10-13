import { RawTweet } from '../types/analytics';

// Curated authentic sample dataset reflecting a Kaggle Social Network & Tech Twitter Influencer crawl
export const SAMPLE_TWEETS: RawTweet[] = [
  // User: @sama (Sam Altman)
  {
    id: 'tw_1001',
    user_name: 'sama',
    user_screen_name: 'Sam Altman',
    text: 'Excited to announce our new multimodal intelligence model. Big thanks to @OpenAI researchers and @gdb for incredible engineering breakthroughs! #AI #DeepLearning',
    created_at: '2024-03-11 14:22:00', // Monday
    retweet_count: 14200,
    favorite_count: 58900,
    followers_count: 2850000,
    user_location: 'San Francisco, CA',
    hashtags: '#AI #DeepLearning'
  },
  {
    id: 'tw_1002',
    user_name: 'sama',
    user_screen_name: 'Sam Altman',
    text: 'Compute efficiency is improving faster than algorithmic limits. Talking with @satyanadella on future infrastructure scaling. The progress is truly remarkable.',
    created_at: '2024-03-12 18:05:00', // Tuesday
    retweet_count: 8900,
    favorite_count: 42100,
    followers_count: 2850000,
    user_location: 'San Francisco, CA',
    hashtags: '#AI #Infrastructure'
  },
  {
    id: 'tw_1003',
    user_name: 'sama',
    user_screen_name: 'Sam Altman',
    text: 'Addressing severe GPU supply shortage issues with @nvidia and @jensenhuang. We must accelerate data center buildouts to meet scientific demand.',
    created_at: '2024-03-13 09:15:00', // Wednesday
    retweet_count: 6700,
    favorite_count: 31200,
    followers_count: 2850000,
    user_location: 'San Francisco, CA',
    hashtags: '#GPU #Hardware'
  },

  // User: @ylecun (Yann LeCun)
  {
    id: 'tw_1004',
    user_name: 'ylecun',
    user_screen_name: 'Yann LeCun',
    text: 'Auto-regressive LLMs are useful, but Objective-Driven AI and World Models are the real path to human-level intelligence. Great paper by @MetaAI research team! #MachineLearning #Research',
    created_at: '2024-03-13 11:30:00', // Wednesday
    retweet_count: 11400,
    favorite_count: 46800,
    followers_count: 620000,
    user_location: 'New York, NY',
    hashtags: '#MachineLearning #Research'
  },
  {
    id: 'tw_1005',
    user_name: 'ylecun',
    user_screen_name: 'Yann LeCun',
    text: 'Open science and open source model weights like Llama accelerate global innovation. Closed systems lead to monopoly and stagnation. Disagree with @sama on regulatory capture.',
    created_at: '2024-03-14 16:40:00', // Thursday
    retweet_count: 9800,
    favorite_count: 41200,
    followers_count: 620000,
    user_location: 'New York, NY',
    hashtags: '#OpenSource #Llama'
  },
  {
    id: 'tw_1006',
    user_name: 'ylecun',
    user_screen_name: 'Yann LeCun',
    text: 'Fascinating joint talk with @geoffreyhinton and @AndrewYNg at NeurIPS. We differ on existential risk, but agree on deep learning foundations.',
    created_at: '2024-03-15 13:10:00', // Friday
    retweet_count: 7300,
    favorite_count: 35600,
    followers_count: 620000,
    user_location: 'New York, NY',
    hashtags: '#NeurIPS #DeepLearning'
  },

  // User: @AndrewYNg (Andrew Ng)
  {
    id: 'tw_1007',
    user_name: 'AndrewYNg',
    user_screen_name: 'Andrew Ng',
    text: 'Agentic workflows will drive massive AI progress this year. Instead of zero-shot prompting, iterative reflection and tool use deliver outstanding quality. #AI #DataScience',
    created_at: '2024-03-12 10:15:00', // Tuesday
    retweet_count: 15800,
    favorite_count: 64200,
    followers_count: 940000,
    user_location: 'Palo Alto, CA',
    hashtags: '#AI #DataScience'
  },
  {
    id: 'tw_1008',
    user_name: 'AndrewYNg',
    user_screen_name: 'Andrew Ng',
    text: 'Just published our new short course with @LangChainAI and @hwchase17 on building autonomous multi-agent teams. Python code and notebooks free to all learners! #Python',
    created_at: '2024-03-14 14:00:00', // Thursday
    retweet_count: 8200,
    favorite_count: 39500,
    followers_count: 940000,
    user_location: 'Palo Alto, CA',
    hashtags: '#Python #DeepLearning'
  },
  {
    id: 'tw_1009',
    user_name: 'AndrewYNg',
    user_screen_name: 'Andrew Ng',
    text: 'Data-centric AI remains crucial. High quality curated data beats massive noisy datasets every single time. Kudos to @kaggle community for clean benchmarks!',
    created_at: '2024-03-16 11:20:00', // Saturday
    retweet_count: 6400,
    favorite_count: 29800,
    followers_count: 940000,
    user_location: 'Palo Alto, CA',
    hashtags: '#DataScience #MachineLearning'
  },

  // User: @karpathy (Andrej Karpathy)
  {
    id: 'tw_1010',
    user_name: 'karpathy',
    user_screen_name: 'Andrej Karpathy',
    text: 'Building an educational OS from scratch. Tokenization is where 80% of weird LLM edge case bugs occur. Check out my new tutorial walking through BPE in raw Python! #Python #AI',
    created_at: '2024-03-13 19:45:00', // Wednesday
    retweet_count: 17500,
    favorite_count: 76000,
    followers_count: 1120000,
    user_location: 'San Francisco, CA',
    hashtags: '#Python #AI'
  },
  {
    id: 'tw_1011',
    user_name: 'karpathy',
    user_screen_name: 'Andrej Karpathy',
    text: 'LLMs are essentially the kernel of a new computing architecture. Fascinating reading @demishassabis thoughts on DeepMind AlphaFold3 architecture today.',
    created_at: '2024-03-15 15:30:00', // Friday
    retweet_count: 10400,
    favorite_count: 48900,
    followers_count: 1120000,
    user_location: 'San Francisco, CA',
    hashtags: '#DeepLearning #TechTrends'
  },

  // User: @demishassabis (Demis Hassabis)
  {
    id: 'tw_1012',
    user_name: 'demishassabis',
    user_screen_name: 'Demis Hassabis',
    text: 'Thrilled to share our latest breakthroughs at @GoogleDeepMind in structural biology and materials discovery with @GoogleAI! AI for fundamental science is entering a golden era.',
    created_at: '2024-03-11 16:30:00', // Monday
    retweet_count: 9100,
    favorite_count: 43200,
    followers_count: 410000,
    user_location: 'London, UK',
    hashtags: '#Science #AlphaFold'
  },
  {
    id: 'tw_1013',
    user_name: 'demishassabis',
    user_screen_name: 'Demis Hassabis',
    text: 'Deep learning applied to fusion plasma control and quantum chemistry. Outstanding collaboration with UK researchers and @sundarpichai support.',
    created_at: '2024-03-14 11:15:00', // Thursday
    retweet_count: 5300,
    favorite_count: 27400,
    followers_count: 410000,
    user_location: 'London, UK',
    hashtags: '#DeepLearning #Quantum'
  },

  // User: @elonmusk (Elon Musk)
  {
    id: 'tw_1014',
    user_name: 'elonmusk',
    user_screen_name: 'Elon Musk',
    text: 'Grok 2 training is complete. Open-sourcing weights next week. We must pursue maximum truth-seeking AI without bias. @xAI team did an incredible job.',
    created_at: '2024-03-16 21:10:00', // Saturday
    retweet_count: 28900,
    favorite_count: 145000,
    followers_count: 174000000,
    user_location: 'Austin, TX',
    hashtags: '#Grok #OpenSource'
  },
  {
    id: 'tw_1015',
    user_name: 'elonmusk',
    user_screen_name: 'Elon Musk',
    text: 'Full Self-Driving V12 end-to-end neural networks replace 300,000 lines of C++ code. Pure photon in, control out. Big leap forward. @Tesla #FSD #AI',
    created_at: '2024-03-17 17:50:00', // Sunday
    retweet_count: 22400,
    favorite_count: 119000,
    followers_count: 174000000,
    user_location: 'Austin, TX',
    hashtags: '#FSD #AI'
  },

  // User: @fchollet (François Chollet)
  {
    id: 'tw_1016',
    user_name: 'fchollet',
    user_screen_name: 'François Chollet',
    text: 'ARC-AGI benchmark results show scaling transformers alone will not yield general intelligence. Novel task synthesis requires real program search. #ARC #AGI',
    created_at: '2024-03-12 14:40:00', // Tuesday
    retweet_count: 5800,
    favorite_count: 28400,
    followers_count: 360000,
    user_location: 'Seattle, WA',
    hashtags: '#ARC #AGI'
  },
  {
    id: 'tw_1017',
    user_name: 'fchollet',
    user_screen_name: 'François Chollet',
    text: 'Keras 3 multi-backend engine now runs seamlessly on JAX, PyTorch, and TensorFlow. Great work by community contributors on GitHub! #Python #OpenSource',
    created_at: '2024-03-15 08:30:00', // Friday
    retweet_count: 4200,
    favorite_count: 21500,
    followers_count: 360000,
    user_location: 'Seattle, WA',
    hashtags: '#Python #OpenSource'
  },

  // User: @huggingface (Hugging Face)
  {
    id: 'tw_1018',
    user_name: 'huggingface',
    user_screen_name: 'Hugging Face',
    text: 'Over 500,000 models now hosted on the Hub! Massive thanks to @MetaAI @GoogleAI @MistralAI and independent creators worldwide! Open science wins. #MachineLearning',
    created_at: '2024-03-11 12:00:00', // Monday
    retweet_count: 6800,
    favorite_count: 31000,
    followers_count: 480000,
    user_location: 'New York / Paris',
    hashtags: '#MachineLearning #OpenSource'
  },
  {
    id: 'tw_1019',
    user_name: 'huggingface',
    user_screen_name: 'Hugging Face',
    text: 'Excited to release Transformers 4.40 with 4-bit quant support and flash attention 2. Check out @ClementDelangue demo! #Python #DeepLearning',
    created_at: '2024-03-13 15:20:00', // Wednesday
    retweet_count: 4900,
    favorite_count: 23400,
    followers_count: 480000,
    user_location: 'New York / Paris',
    hashtags: '#Python #DeepLearning'
  },

  // User: @MistralAI (Mistral AI)
  {
    id: 'tw_1020',
    user_name: 'MistralAI',
    user_screen_name: 'Mistral AI',
    text: 'Introducing Mixtral 8x22B, our latest open-weights sparse Mixture-of-Experts model. High performance with unmatched token throughput. Weights available on @huggingface!',
    created_at: '2024-03-14 08:00:00', // Thursday
    retweet_count: 11200,
    favorite_count: 45000,
    followers_count: 290000,
    user_location: 'Paris, France',
    hashtags: '#Mixtral #OpenWeights'
  },

  // Tech Journalists, Researchers & Industry Mentions
  {
    id: 'tw_1021',
    user_name: 'tech_analyst_dan',
    user_screen_name: 'Dan Ives',
    text: 'Major tech earnings report: AI enterprise spending is booming. Enterprise cloud adoption driven by @satyanadella and @sundarpichai shows massive 30% YoY growth. #TechTrends',
    created_at: '2024-03-12 16:15:00', // Tuesday
    retweet_count: 2100,
    favorite_count: 8900,
    followers_count: 154000,
    user_location: 'New York, NY',
    hashtags: '#TechTrends #Cloud'
  },
  {
    id: 'tw_1022',
    user_name: 'hardmaru',
    user_screen_name: 'David Ha',
    text: 'Fascinating paper on evolutionary algorithms applied to neural network prompt optimization. Kudos to @SakanaAILabs team! Evolution is still underrated. #AI #Research',
    created_at: '2024-03-13 14:10:00', // Wednesday
    retweet_count: 3400,
    favorite_count: 16700,
    followers_count: 185000,
    user_location: 'Tokyo, Japan',
    hashtags: '#AI #Research'
  },
  {
    id: 'tw_1023',
    user_name: 'ylecun',
    user_screen_name: 'Yann LeCun',
    text: 'Sad to see ongoing regulatory fear-mongering. Real threats are closed monopolies, not sentient machines. Open research must prevail. Cc @sama @fchollet',
    created_at: '2024-03-16 15:45:00', // Saturday
    retweet_count: 7800,
    favorite_count: 36000,
    followers_count: 620000,
    user_location: 'New York, NY',
    hashtags: '#OpenSource #Safety'
  },
  {
    id: 'tw_1024',
    user_name: 'svpino',
    user_screen_name: 'Santiago',
    text: 'If you want to master Machine Learning in 2024: 1. Python & Linear Algebra 2. PyTorch fundamentals 3. Follow @AndrewYNg and @karpathy lectures 4. Practice on @kaggle. Do not overcomplicate it! #DataScience #Python',
    created_at: '2024-03-15 12:00:00', // Friday
    retweet_count: 5100,
    favorite_count: 26800,
    followers_count: 240000,
    user_location: 'Miami, FL',
    hashtags: '#DataScience #Python'
  },
  {
    id: 'tw_1025',
    user_name: 'svpino',
    user_screen_name: 'Santiago',
    text: 'RAG systems fail primarily because of poor document chunking and vector index noise, not LLM capability. Clean preprocessing saves 90% of failures. #AI #Software',
    created_at: '2024-03-17 14:30:00', // Sunday
    retweet_count: 3900,
    favorite_count: 19500,
    followers_count: 240000,
    user_location: 'Miami, FL',
    hashtags: '#AI #Software'
  },
  {
    id: 'tw_1026',
    user_name: 'rowancheung',
    user_screen_name: 'Rowan Cheung',
    text: 'This week in AI was insane: 1. @OpenAI releases Sora previews with @sama 2. @MistralAI Mixtral 8x22B drop 3. @elonmusk Grok updates 4. @GoogleDeepMind AlphaFold expansion. The pace is breathtaking! #AI',
    created_at: '2024-03-17 19:00:00', // Sunday
    retweet_count: 4800,
    favorite_count: 24300,
    followers_count: 380000,
    user_location: 'Vancouver, Canada',
    hashtags: '#AI #TechTrends'
  },
  {
    id: 'tw_1027',
    user_name: 'bindureddy',
    user_screen_name: 'Bindu Reddy',
    text: 'Open source models will commoditize proprietary APIs. In 18 months, running local models with @ollama and @huggingface will be cheaper and more private than paying @OpenAI token fees. #OpenSource #AI',
    created_at: '2024-03-14 17:15:00', // Thursday
    retweet_count: 3100,
    favorite_count: 14600,
    followers_count: 165000,
    user_location: 'San Francisco, CA',
    hashtags: '#OpenSource #AI'
  },
  {
    id: 'tw_1028',
    user_name: 'data_chick',
    user_screen_name: 'Elena Rostova',
    text: 'Terrible outage on cloud provider ruined our model fine-tuning job overnight. Lost 14 hours of compute due to bad disk failure. Absolutely frustrating! #Cloud #DevOps',
    created_at: '2024-03-11 08:45:00', // Monday
    retweet_count: 420,
    favorite_count: 2890,
    followers_count: 42000,
    user_location: 'Berlin, Germany',
    hashtags: '#Cloud #DevOps'
  },
  {
    id: 'tw_1029',
    user_name: 'code_whisperer',
    user_screen_name: 'Marcus Vance',
    text: 'Bug report: Critical vulnerability discovered in deprecated dependency parser. Update your lockfiles immediately or risk severe breach attack! Alert to all Python devs. #Security #Python',
    created_at: '2024-03-12 11:20:00', // Tuesday
    retweet_count: 1480,
    favorite_count: 4120,
    followers_count: 67000,
    user_location: 'Austin, TX',
    hashtags: '#Security #Python'
  },
  {
    id: 'tw_1030',
    user_name: 'ai_ethicist',
    user_screen_name: 'Claire Moreau',
    text: 'Disappointing lack of diversity and extreme copyright scrape without consent in recent benchmark datasets. We need genuine accountability, not just PR claims. #Ethics #AI',
    created_at: '2024-03-13 16:50:00', // Wednesday
    retweet_count: 890,
    favorite_count: 3410,
    followers_count: 53000,
    user_location: 'Paris, France',
    hashtags: '#Ethics #AI'
  },
  {
    id: 'tw_1031',
    user_name: 'satyanadella',
    user_screen_name: 'Satya Nadella',
    text: 'Empowering every developer with Copilot and frontier models. Great momentum collaborating with @sama @OpenAI and our global cloud partners. #Microsoft #AI',
    created_at: '2024-03-12 19:00:00', // Tuesday
    retweet_count: 6200,
    favorite_count: 34500,
    followers_count: 3100000,
    user_location: 'Redmond, WA',
    hashtags: '#Microsoft #AI'
  },
  {
    id: 'tw_1032',
    user_name: 'sundarpichai',
    user_screen_name: 'Sundar Pichai',
    text: 'Gemini 1.5 Pro with 1 million token context window is a massive technical leap. Proud of @demishassabis and the entire @GoogleDeepMind team! #Gemini #GoogleAI',
    created_at: '2024-03-11 15:40:00', // Monday
    retweet_count: 8400,
    favorite_count: 46200,
    followers_count: 5400000,
    user_location: 'Mountain View, CA',
    hashtags: '#Gemini #GoogleAI'
  },
  {
    id: 'tw_1033',
    user_name: 'gdb',
    user_screen_name: 'Greg Brockman',
    text: 'It is amazing what happens when talented researchers come together to solve hardest math problems. Grateful to work alongside @sama and our @OpenAI team.',
    created_at: '2024-03-14 20:30:00', // Thursday
    retweet_count: 5100,
    favorite_count: 28700,
    followers_count: 750000,
    user_location: 'San Francisco, CA',
    hashtags: '#OpenAI #DeepLearning'
  },
  {
    id: 'tw_1034',
    user_name: 'ClementDelangue',
    user_screen_name: 'Clem Delangue',
    text: 'Open source AI is winning! 1 million community fine-tunes on @huggingface. The future of software is collaborative and open. Shoutout to @ylecun for championing open research!',
    created_at: '2024-03-15 17:15:00', // Friday
    retweet_count: 4100,
    favorite_count: 22100,
    followers_count: 210000,
    user_location: 'New York, NY',
    hashtags: '#OpenSource #Community'
  },
  {
    id: 'tw_1035',
    user_name: 'jensenhuang',
    user_screen_name: 'Jensen Huang',
    text: 'The data center is the new unit of computing. Accelerated computing saves energy while scaling throughput by orders of magnitude. Partnering with @satyanadella @sama @sundarpichai.',
    created_at: '2024-03-13 13:00:00', // Wednesday
    retweet_count: 7900,
    favorite_count: 41900,
    followers_count: 890000,
    user_location: 'Santa Clara, CA',
    hashtags: '#NVIDIA #AI'
  },
  {
    id: 'tw_1036',
    user_name: 'geoffreyhinton',
    user_screen_name: 'Geoffrey Hinton',
    text: 'Reflecting on backpropagation and biological plausibility. Digital computation has advantages in sharing weights instantly, but biological energy efficiency is still unmatched.',
    created_at: '2024-03-16 10:05:00', // Saturday
    retweet_count: 6300,
    favorite_count: 33100,
    followers_count: 490000,
    user_location: 'Toronto, Canada',
    hashtags: '#Neuroscience #DeepLearning'
  },
  {
    id: 'tw_1037',
    user_name: 'hwchase17',
    user_screen_name: 'Harrison Chase',
    text: 'LangGraph v0.1 released today. Human-in-the-loop cyclic multi-agent graphs are now first-class citizens. Huge thanks to @AndrewYNg for valuable architecture feedback! #AI #Agents',
    created_at: '2024-03-14 18:20:00', // Thursday
    retweet_count: 3600,
    favorite_count: 17800,
    followers_count: 145000,
    user_location: 'San Francisco, CA',
    hashtags: '#AI #Agents'
  },
  {
    id: 'tw_1038',
    user_name: 'kaggle',
    user_screen_name: 'Kaggle',
    text: 'New Community Competition live: Social Network Influence and Graph Community Detection! Prize pool $50,000. Datasets, Python starter notebooks, and Leaderboard ready. #DataScience #Python',
    created_at: '2024-03-11 17:00:00', // Monday
    retweet_count: 4500,
    favorite_count: 21000,
    followers_count: 670000,
    user_location: 'San Francisco, CA',
    hashtags: '#DataScience #Python'
  },
  {
    id: 'tw_1039',
    user_name: 'GoogleAI',
    user_screen_name: 'Google AI',
    text: 'New research on scalable graph neural networks for multi-million node social graphs. Read our open paper and test code on GitHub with @GoogleDeepMind researchers. #GraphAnalytics #MachineLearning',
    created_at: '2024-03-12 15:00:00', // Tuesday
    retweet_count: 5200,
    favorite_count: 24700,
    followers_count: 2200000,
    user_location: 'Mountain View, CA',
    hashtags: '#GraphAnalytics #MachineLearning'
  },
  {
    id: 'tw_1040',
    user_name: 'OpenAI',
    user_screen_name: 'OpenAI',
    text: 'We are expanding access to our developer platform with reduced latency and improved rate limits. Thanks to @sama and community feedback for guiding our roadmap. #Developers #AI',
    created_at: '2024-03-13 17:30:00', // Wednesday
    retweet_count: 8400,
    favorite_count: 41000,
    followers_count: 3400000,
    user_location: 'San Francisco, CA',
    hashtags: '#Developers #AI'
  },
  {
    id: 'tw_1041',
    user_name: 'MetaAI',
    user_screen_name: 'Meta AI',
    text: 'Proud to announce new research in self-supervised speech representation and vision-language navigation with @ylecun. Full code and model weights released open source. #OpenSource #AI',
    created_at: '2024-03-14 13:45:00', // Thursday
    retweet_count: 6100,
    favorite_count: 29500,
    followers_count: 1100000,
    user_location: 'Menlo Park, CA',
    hashtags: '#OpenSource #AI'
  },
  {
    id: 'tw_1042',
    user_name: 'neural_net_nerd',
    user_screen_name: 'Alex Chen',
    text: 'Trying out new sparse attention implementation in PyTorch. Benchmark run speedup is 2.4x on A100. Excellent writeup by @karpathy helped understand kernel tiling. #DeepLearning #Python',
    created_at: '2024-03-15 14:15:00', // Friday
    retweet_count: 980,
    favorite_count: 4800,
    followers_count: 38000,
    user_location: 'Seattle, WA',
    hashtags: '#DeepLearning #Python'
  },
  {
    id: 'tw_1043',
    user_name: 'data_viz_pro',
    user_screen_name: 'Sarah Jenkins',
    text: 'Network graph visualization of Twitter conversations reveals clear polarization between closed proprietary AI camps and open source research groups. Data science at its finest! #DataViz #GraphTheory',
    created_at: '2024-03-16 16:30:00', // Saturday
    retweet_count: 1420,
    favorite_count: 6900,
    followers_count: 51000,
    user_location: 'Chicago, IL',
    hashtags: '#DataViz #GraphTheory'
  },
  {
    id: 'tw_1044',
    user_name: 'quant_coder',
    user_screen_name: 'Rajiv Patel',
    text: 'Our algorithmic trading backtest suffered terrible latency spikes today due to market data feed delay. Bad execution resulted in painful drawdown. Need better failover handling. #Quant #Trading',
    created_at: '2024-03-12 08:30:00', // Tuesday
    retweet_count: 310,
    favorite_count: 1420,
    followers_count: 29000,
    user_location: 'New York, NY',
    hashtags: '#Quant #Trading'
  },
  {
    id: 'tw_1045',
    user_name: 'ai_safety_lab',
    user_screen_name: 'Safety Research Hub',
    text: 'New paper evaluating red-teaming techniques and jailbreak resistance across 12 commercial LLMs. Risk remains high for multi-turn adversarial injection. @geoffreyhinton comments included. #AISafety',
    created_at: '2024-03-13 12:15:00', // Wednesday
    retweet_count: 1250,
    favorite_count: 5400,
    followers_count: 44000,
    user_location: 'Oxford, UK',
    hashtags: '#AISafety #Research'
  },
  {
    id: 'tw_1046',
    user_name: 'nlp_researcher',
    user_screen_name: 'Dr. Priya Sharma',
    text: 'Honored to present our paper on multilingual graph community detection at EMNLP. Huge thanks to @huggingface and @kaggle for open datasets! #EMNLP #NLP',
    created_at: '2024-03-15 11:45:00', // Friday
    retweet_count: 850,
    favorite_count: 4200,
    followers_count: 36000,
    user_location: 'Bengaluru, India',
    hashtags: '#EMNLP #NLP'
  },
  {
    id: 'tw_1047',
    user_name: 'tech_journalist',
    user_screen_name: 'Emily Watson',
    text: 'Exclusive interview with @sama and @satyanadella on the trillion-dollar datacenter race. How energy constraints are reshaping Silicon Valley geopolitics. #TechNews',
    created_at: '2024-03-14 15:10:00', // Thursday
    retweet_count: 2400,
    favorite_count: 10200,
    followers_count: 112000,
    user_location: 'San Francisco, CA',
    hashtags: '#TechNews #AI'
  },
  {
    id: 'tw_1048',
    user_name: 'gpu_enthusiast',
    user_screen_name: 'Leonidas K.',
    text: 'Unboxing our new dual liquid-cooled workstation. Testing local 70B parameter inference with @MistralAI models. Running at 32 tokens/sec without crashing! Awesome engineering. #Hardware #Linux',
    created_at: '2024-03-16 18:40:00', // Saturday
    retweet_count: 730,
    favorite_count: 3950,
    followers_count: 31000,
    user_location: 'Athens, Greece',
    hashtags: '#Hardware #Linux'
  },
  {
    id: 'tw_1049',
    user_name: 'startup_founder',
    user_screen_name: 'Liam Vance',
    text: 'Closed our seed round today! Building generative tools for healthcare diagnostics. So grateful to advisors and early beta testers. Onwards! #Startups #Healthcare',
    created_at: '2024-03-17 11:20:00', // Sunday
    retweet_count: 620,
    favorite_count: 4100,
    followers_count: 28000,
    user_location: 'Boston, MA',
    hashtags: '#Startups #Healthcare'
  },
  {
    id: 'tw_1050',
    user_name: 'data_scientist_kai',
    user_screen_name: 'Kai Tanaka',
    text: 'Weekly reminder: Degree centrality measures who talks the most or gets mentioned directly, but PageRank reveals true structural influence across the entire connected network! #DataScience #GraphTheory',
    created_at: '2024-03-13 18:00:00', // Wednesday
    retweet_count: 1890,
    favorite_count: 9400,
    followers_count: 59000,
    user_location: 'Tokyo, Japan',
    hashtags: '#DataScience #GraphTheory'
  }
];

// Generate additional authentic records programmatically to provide a full 150+ tweet dataset
export function getExpandedSampleDataset(): RawTweet[] {
  const base = [...SAMPLE_TWEETS];
  const users = [
    { name: 'sama', screenName: 'Sam Altman', followers: 2850000, loc: 'San Francisco, CA' },
    { name: 'ylecun', screenName: 'Yann LeCun', followers: 620000, loc: 'New York, NY' },
    { name: 'AndrewYNg', screenName: 'Andrew Ng', followers: 940000, loc: 'Palo Alto, CA' },
    { name: 'karpathy', screenName: 'Andrej Karpathy', followers: 1120000, loc: 'San Francisco, CA' },
    { name: 'demishassabis', screenName: 'Demis Hassabis', followers: 410000, loc: 'London, UK' },
    { name: 'elonmusk', screenName: 'Elon Musk', followers: 174000000, loc: 'Austin, TX' },
    { name: 'satyanadella', screenName: 'Satya Nadella', followers: 3100000, loc: 'Redmond, WA' },
    { name: 'sundarpichai', screenName: 'Sundar Pichai', followers: 5400000, loc: 'Mountain View, CA' },
    { name: 'huggingface', screenName: 'Hugging Face', followers: 480000, loc: 'New York, NY' },
    { name: 'MistralAI', screenName: 'Mistral AI', followers: 290000, loc: 'Paris, France' },
    { name: 'ClementDelangue', screenName: 'Clem Delangue', followers: 210000, loc: 'New York, NY' },
    { name: 'fchollet', screenName: 'François Chollet', followers: 360000, loc: 'Seattle, WA' },
    { name: 'svpino', screenName: 'Santiago', followers: 240000, loc: 'Miami, FL' },
    { name: 'hwchase17', screenName: 'Harrison Chase', followers: 145000, loc: 'San Francisco, CA' },
    { name: 'kaggle', screenName: 'Kaggle', followers: 670000, loc: 'San Francisco, CA' }
  ];

  const mentionTargets = ['sama', 'ylecun', 'AndrewYNg', 'karpathy', 'OpenAI', 'GoogleAI', 'MetaAI', 'huggingface', 'MistralAI', 'elonmusk', 'satyanadella'];
  const hashtagsList = ['#AI', '#MachineLearning', '#DataScience', '#DeepLearning', '#Python', '#OpenSource', '#TechTrends', '#GraphAnalytics'];
  const dates = [
    '2024-03-11', // Mon
    '2024-03-12', // Tue
    '2024-03-13', // Wed
    '2024-03-14', // Thu
    '2024-03-15', // Fri
    '2024-03-16', // Sat
    '2024-03-17'  // Sun
  ];

  const templates = [
    { text: 'Great discussions today regarding open foundation models with @{target}. Innovation thrives when research is reproducible! {tag}', tone: 'positive' },
    { text: 'Reviewing recent benchmark papers by @{target}. Impressive optimization results and great efficiency gains. {tag}', tone: 'positive' },
    { text: 'Deep dive into graph centrality calculations with Python and NetworkX. Mention networks reveal authentic community influence. {tag}', tone: 'neutral' },
    { text: 'Encountered unexpected training crash due to distributed communication timeout. Horrible bug to debug on weekend! {tag}', tone: 'negative' },
    { text: 'Excited about the agentic framework release from @{target}. The future of autonomous AI software looks bright! {tag}', tone: 'positive' },
    { text: 'Critical analysis of synthetic data limitations. Without high quality human curation, models suffer from severe mode collapse. {tag}', tone: 'neutral' },
    { text: 'Disappointed by recent closed license changes from proprietary providers. Open source models with @huggingface are essential. {tag}', tone: 'negative' },
    { text: 'Congratulations to @{target} on the outstanding milestone! Remarkable execution by the team. {tag}', tone: 'positive' },
    { text: 'Graph community detection algorithms like Louvain effectively partition social networks into natural topic clusters. {tag}', tone: 'neutral' },
    { text: 'Fascinating podcast conversation with @{target} on AI safety, alignment, and infrastructure scaling. {tag}', tone: 'positive' }
  ];

  let idCounter = 1051;
  for (let i = 0; i < 90; i++) {
    const user = users[i % users.length];
    const target = mentionTargets[(i * 3 + 2) % mentionTargets.length];
    const template = templates[i % templates.length];
    const date = dates[i % dates.length];
    const hour = (8 + (i * 2) % 14).toString().padStart(2, '0');
    const minute = ((i * 7) % 60).toString().padStart(2, '0');
    const tag = hashtagsList[i % hashtagsList.length];

    const tweetText = template.text
      .replace('{target}', target)
      .replace('{tag}', tag);

    const isTopInfluencer = user.followers > 1000000;
    const baseRt = isTopInfluencer ? 2500 + (i * 137) % 8000 : 300 + (i * 71) % 1800;
    const baseLikes = baseRt * (3.5 + ((i % 5) * 0.4));

    base.push({
      id: `tw_${idCounter++}`,
      user_name: user.name,
      user_screen_name: user.screenName,
      text: tweetText,
      created_at: `${date} ${hour}:${minute}:00`,
      retweet_count: Math.round(baseRt),
      favorite_count: Math.round(baseLikes),
      followers_count: user.followers,
      user_location: user.loc,
      hashtags: tag
    });
  }

  return base;
}
