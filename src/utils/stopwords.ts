export const ENGLISH_STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could',
  'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for',
  'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s',
  'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m',
  'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves',
  'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some',
  'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these',
  'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up',
  'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when',
  'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would',
  'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves',
  // Twitter / Web noise words
  'rt', 'http', 'https', 'co', 'amp', 'via', 'com', 'twitter', 'tweet', 'tweets', 'just', 'like', 'get', 'one', 'new',
  'also', 'now', 'today', 'us', 'see', 'will', 'make', 'can', 'go', 'know', 'day', 'time', 'well', 'much'
]);

// Lexicon for VADER / AFINN style sentiment classification
export const SENTIMENT_LEXICON: Record<string, number> = {
  // Strong positive
  'excellent': 3.5, 'outstanding': 3.5, 'amazing': 3.0, 'awesome': 3.0, 'great': 2.5, 'fantastic': 3.0,
  'superb': 3.0, 'love': 3.0, 'best': 3.0, 'breakthrough': 3.0, 'revolutionary': 3.0, 'inspire': 2.5,
  'innovative': 2.5, 'brilliant': 3.0, 'success': 2.5, 'successful': 2.5, 'winner': 2.5, 'impressive': 2.5,
  'wonderful': 2.8, 'excited': 2.5, 'exciting': 2.5, 'perfect': 3.0, 'positive': 2.0, 'proud': 2.0,
  'valuable': 2.0, 'genius': 2.8, 'champion': 2.5, 'efficient': 2.0, 'leader': 2.0, 'leading': 2.0,
  'good': 1.8, 'nice': 1.5, 'cool': 1.5, 'happy': 2.2, 'glad': 1.8, 'thank': 1.8, 'thanks': 1.8,
  'progress': 2.0, 'gain': 1.8, 'growth': 2.0, 'benefit': 2.0, 'advancement': 2.2, 'support': 1.5,
  'future': 1.2, 'smart': 2.0, 'helpful': 2.0, 'promising': 2.2, 'opportunity': 2.0, 'collaborate': 1.8,

  // Moderate / Strong negative
  'terrible': -3.2, 'horrible': -3.2, 'awful': -3.0, 'worst': -3.5, 'fail': -2.5, 'failure': -2.8,
  'failed': -2.5, 'bad': -2.0, 'poor': -2.0, 'crisis': -2.8, 'disaster': -3.2, 'crash': -2.6,
  'crashed': -2.6, 'broken': -2.2, 'hate': -3.0, 'hated': -3.0, 'scam': -3.5, 'fraud': -3.5,
  'bug': -1.8, 'bugs': -1.8, 'error': -2.0, 'vulnerability': -2.8, 'breach': -3.0, 'attack': -2.5,
  'threat': -2.5, 'loss': -2.2, 'damage': -2.5, 'slow': -1.5, 'delay': -1.8, 'problem': -2.0,
  'issue': -1.5, 'issues': -1.5, 'disappointed': -2.5, 'disappointing': -2.5, 'useless': -2.8,
  'down': -1.2, 'declining': -2.0, 'waste': -2.5, 'warning': -1.8, 'danger': -2.5, 'outage': -2.5,
  'controversial': -1.8, 'struggle': -2.0, 'risk': -1.8, 'flaw': -2.2, 'fake': -2.8
};
