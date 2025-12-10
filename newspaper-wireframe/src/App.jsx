import React, { useState, useEffect, useRef } from 'react';
import { X, Menu, Clock, Heart, MessageCircle, Share2, ChevronLeft, ArrowUp, Bookmark, Moon, Sun, Search, TrendingUp, Sparkles, Zap, Lightbulb } from 'lucide-react';
import './index.css';

export default function NewspaperAppWireframe() {
  const categories = ['Technology', 'Sports', 'Politics', 'Entertainment', 'Writing', 'Business', 'Lifestyle', 'Opinion', 'Science'];
  
  const posts = [
    { id: 1, author: 'JOHN HENDERSON', headline: 'The Rise of Artificial Intelligence in Modern Healthcare Systems', category: 'Technology' },
    { id: 2, author: 'SARAH MITCHELL', headline: 'European Markets React to New Economic Policy Changes', category: 'Business' },
    { id: 3, author: 'DAVID LAWSON', headline: 'Championship Finals: Historic Victory Marks New Era', category: 'Sports' },
    { id: 4, author: 'EMMA ROBERTS', headline: 'Classical Literature in the Digital Age: A Renaissance', category: 'Writing' },
    { id: 5, author: 'MICHAEL CHANG', headline: 'Global Climate Summit Reaches Landmark Agreement', category: 'Politics' },
    { id: 6, author: 'RACHEL COOPER', headline: 'Minimalist Living: The Movement Reshaping Urban Life', category: 'Lifestyle' },
    { id: 7, author: 'THOMAS WRIGHT', headline: 'Broadway Returns with Revolutionary Production Techniques', category: 'Entertainment' },
    { id: 8, author: 'LISA MARTINEZ', headline: 'Breakthrough in Quantum Computing Announced by Research Team', category: 'Technology' },
    { id: 9, author: 'JAMES HARRISON', headline: 'The Economics of Remote Work: Five Years Later', category: 'Business' },
    { id: 10, author: 'ANNA THOMPSON', headline: 'International Film Festival Celebrates Independent Cinema', category: 'Entertainment' },
    { id: 11, author: 'ROBERT KLEIN', headline: 'Modern Architecture Embraces Sustainable Design Principles', category: 'Lifestyle' },
    { id: 12, author: 'VICTORIA HAYES', headline: 'Education Reform: New Standards Transform Curriculum', category: 'Opinion' },
  ];

  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Technology');
  const [showConnections, setShowConnections] = useState(false);
  const [upvotes, setUpvotes] = useState(() => {
    // Initialize with random upvote counts for each post
    const initialUpvotes = {};
    posts.forEach(post => {
      initialUpvotes[post.id] = Math.floor(Math.random() * 500) + 50;
    });
    return initialUpvotes;
  });
  const [upvotedPosts, setUpvotedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [reactions, setReactions] = useState(() => {
    const initialReactions = {};
    posts.forEach(post => {
      initialReactions[post.id] = {
        clap: Math.floor(Math.random() * 100),
        fire: Math.floor(Math.random() * 80),
        lightbulb: Math.floor(Math.random() * 60),
        heart: Math.floor(Math.random() * 120)
      };
    });
    return initialReactions;
  });
  const [userReactions, setUserReactions] = useState({});
  const [readingProgress, setReadingProgress] = useState(0);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const articleRef = useRef(null);

  const connections = [
    'ELIZABETH WARREN', 'MARCUS JOHNSON', 'SOPHIE ANDERSON', 'ALEXANDER GREY',
    'JENNIFER SMITH', 'WILLIAM BROWN', 'CATHERINE EVANS', 'RICHARD TAYLOR'
  ];

  const breakingNews = "BREAKING: Global Climate Summit Reaches Historic Agreement • Tech Stocks Surge 5% • Championship Finals Set for This Weekend";

  // Generate author avatars (using initials in colored circles)
  const getAuthorAvatar = (author) => {
    const initials = author.split(' ').map(n => n[0]).join('');
    const colors = ['#1a1a1a', '#4b5563', '#6b7280', '#9ca3af'];
    const color = colors[author.length % colors.length];
    return { initials, color };
  };

  // Reading progress calculation
  useEffect(() => {
    if (selectedPost && articleRef.current) {
      const handleScroll = () => {
        const article = articleRef.current;
        if (article) {
          const scrollTop = article.scrollTop;
          const scrollHeight = article.scrollHeight - article.clientHeight;
          const progress = (scrollTop / scrollHeight) * 100;
          setReadingProgress(Math.min(100, Math.max(0, progress)));
        }
      };
      const article = articleRef.current;
      article?.addEventListener('scroll', handleScroll);
      return () => article?.removeEventListener('scroll', handleScroll);
    }
  }, [selectedPost]);
  const openPost = (post) => {
    setSelectedPost(post);
  };

  const handleUpvote = (e, postId) => {
    e.stopPropagation();
    if (upvotedPosts.has(postId)) {
      setUpvotes(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
      setUpvotedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      setUpvotes(prev => ({ ...prev, [postId]: prev[postId] + 1 }));
      setUpvotedPosts(prev => new Set(prev).add(postId));
    }
  };

<<<<<<< HEAD
  const handleBookmark = (e, postId) => {
    e.stopPropagation();
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleReaction = (e, postId, reactionType) => {
    e.stopPropagation();
    const currentReaction = userReactions[postId];
    if (currentReaction === reactionType) {
      // Remove reaction
      setReactions(prev => ({
        ...prev,
        [postId]: { ...prev[postId], [reactionType]: prev[postId][reactionType] - 1 }
      }));
      setUserReactions(prev => {
        const newReactions = { ...prev };
        delete newReactions[postId];
        return newReactions;
      });
    } else {
      // Add/change reaction
      if (currentReaction) {
        setReactions(prev => ({
          ...prev,
          [postId]: { ...prev[postId], [currentReaction]: prev[postId][currentReaction] - 1 }
        }));
      }
      setReactions(prev => ({
        ...prev,
        [postId]: { ...prev[postId], [reactionType]: prev[postId][reactionType] + 1 }
      }));
      setUserReactions(prev => ({ ...prev, [postId]: reactionType }));
    }
  };

  const filteredConnections = connections.filter(name => 
    name.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const filteredPosts = activeCategory === 'Technology' ? posts : posts.filter(p => p.category === activeCategory);

  const theme = darkMode ? {
    bg: '#121212',
    surface: '#1e1e1e',
    text: '#e5e5e5',
    textSecondary: '#a3a3a3',
    border: '#2a2a2a',
    accent: '#d4af37',
    cardBg: '#1a1a1a',
    hover: '#2a2a2a'
  } : {
    bg: '#fafafa',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    accent: '#1a1a1a',
    cardBg: '#ffffff',
    hover: '#f9fafb'
  };
  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: theme.bg,
      overflow: 'hidden',
      fontFamily: 'Georgia, "Times New Roman", serif',
      color: theme.text,
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      {/* Breaking News Marquee */}
      <div style={{
        backgroundColor: darkMode ? '#1a1a1a' : '#1a1a1a',
        color: '#ffffff',
        padding: '8px 0',
        overflow: 'hidden',
        position: 'relative',
        borderBottom: `2px solid ${darkMode ? '#d4af37' : '#d4af37'}`,
        zIndex: 15
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite'
        }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.1em',
            paddingRight: '100px'
          }}>
            {breakingNews} • {breakingNews}
          </span>
        </div>
      </div>
      {/* Premium Masthead Header */}
      <div style={{ 
        borderBottom: `3px solid ${theme.accent}`, 
        padding: '20px 24px',
        backgroundColor: theme.surface,
        boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '12px',
          maxWidth: '1400px',
          margin: '0 auto 12px auto'
        }}>
          <button 
            onClick={() => setShowConnections(!showConnections)}
            style={{ 
              padding: '10px', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Menu size={22} strokeWidth={2} />
          </button>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <h1 style={{ 
              fontSize: 'clamp(24px, 4vw, 36px)', 
              fontFamily: 'Georgia, serif', 
              fontWeight: 'bold', 
              letterSpacing: '0.12em', 
              margin: 0,
              color: theme.text,
              textShadow: darkMode ? 'none' : '1px 1px 2px rgba(0,0,0,0.1)',
              transition: 'color 0.3s ease'
            }}>
              THE CHRONICLE
            </h1>
            <p style={{ 
              fontSize: '11px', 
              letterSpacing: '0.2em', 
              marginTop: '6px',
              color: theme.textSecondary,
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>
              WEDNESDAY, DECEMBER 10, 2025
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {darkMode ? <Sun size={22} strokeWidth={2} /> : <Moon size={22} strokeWidth={2} />}
          </button>
        </div>

        {/* Premium Category Tabs - Pill Design */}
        <div style={{ 
          overflowX: 'auto', 
          marginTop: '16px',
          scrollbarWidth: 'thin',
          scrollbarColor: darkMode ? '#2a2a2a transparent' : '#cbd5e1 transparent',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 12px'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            minWidth: 'max-content',
            alignItems: 'center'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontSize: '12px',
                  fontFamily: 'Georgia, serif',
                  whiteSpace: 'nowrap',
                  padding: '8px 20px',
                  background: activeCategory === cat 
                    ? (darkMode ? theme.accent : theme.accent)
                    : (darkMode ? theme.hover : 'transparent'),
                  border: `1px solid ${activeCategory === cat ? theme.accent : theme.border}`,
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontWeight: activeCategory === cat ? 'bold' : '500',
                  color: activeCategory === cat 
                    ? (darkMode ? '#121212' : '#ffffff')
                    : theme.textSecondary,
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  transform: activeCategory === cat ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: activeCategory === cat 
                    ? (darkMode ? '0 2px 8px rgba(212, 175, 55, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)')
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.backgroundColor = darkMode ? '#2a2a2a' : '#f3f4f6';
                    e.currentTarget.style.color = theme.text;
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.textSecondary;
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Main Content Grid */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px',
        backgroundColor: theme.bg,
        transition: 'background-color 0.3s ease'
      }}>
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px',
          paddingBottom: '24px'
        }}>
          {filteredPosts.map(post => {
            const avatar = getAuthorAvatar(post.author);
            const userReaction = userReactions[post.id];
            return (
            <div
              key={post.id}
              onClick={() => openPost(post)}
              style={{
<<<<<<< HEAD
                backgroundColor: theme.cardBg,
                padding: '28px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px',
                border: `1px solid ${theme.border}`,
                boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                e.currentTarget.style.boxShadow = darkMode 
                  ? '0 16px 32px rgba(0,0,0,0.5)' 
                  : '0 16px 32px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = theme.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = darkMode 
                  ? '0 2px 8px rgba(0,0,0,0.3)' 
                  : '0 2px 8px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              {/* Bookmark Button */}
              <button
                onClick={(e) => handleBookmark(e, post.id)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s ease',
                  zIndex: 2
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <Bookmark 
                  size={18} 
                  strokeWidth={2}
                  fill={bookmarkedPosts.has(post.id) ? theme.accent : 'none'}
                  color={bookmarkedPosts.has(post.id) ? theme.accent : theme.textSecondary}
                />
              </button>

              <div style={{ fontFamily: 'Georgia, serif' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: avatar.color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    border: `2px solid ${theme.border}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {avatar.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      fontSize: '11px', 
                      fontWeight: 'bold', 
                      letterSpacing: '0.1em', 
                      margin: 0,
                      color: theme.text,
                      marginBottom: '4px'
                    }}>
                      {post.author}
                    </p>
                    <div style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      backgroundColor: darkMode ? theme.hover : '#f3f4f6',
                      borderRadius: '4px'
                    }}>
                      <p style={{ 
                        fontSize: '9px', 
                        fontWeight: '600', 
                        letterSpacing: '0.08em', 
                        margin: 0,
                        color: theme.textSecondary,
                        textTransform: 'uppercase'
                      }}>
                        {post.category}
                      </p>
                    </div>
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  lineHeight: '1.4', 
                  fontFamily: 'Georgia, serif', 
                  margin: 0,
                  color: theme.text,
                  fontWeight: '700',
                  marginBottom: '16px',
                  transition: 'color 0.3s ease'
                }}>
                  {post.headline}
                </h3>
              </div>
<<<<<<< HEAD

              {/* Reactions Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={(e) => handleReaction(e, post.id, 'clap')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: userReaction === 'clap' ? (darkMode ? '#2a2a2a' : '#fef3c7') : 'transparent',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '11px',
                    color: theme.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    if (userReaction !== 'clap') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>👏</span>
                  <span>{reactions[post.id]?.clap || 0}</span>
                </button>
                <button
                  onClick={(e) => handleReaction(e, post.id, 'fire')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: userReaction === 'fire' ? (darkMode ? '#2a2a2a' : '#fee2e2') : 'transparent',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '11px',
                    color: theme.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    if (userReaction !== 'fire') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>🔥</span>
                  <span>{reactions[post.id]?.fire || 0}</span>
                </button>
                <button
                  onClick={(e) => handleReaction(e, post.id, 'lightbulb')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: userReaction === 'lightbulb' ? (darkMode ? '#2a2a2a' : '#fef9c3') : 'transparent',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '11px',
                    color: theme.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    if (userReaction !== 'lightbulb') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>💡</span>
                  <span>{reactions[post.id]?.lightbulb || 0}</span>
                </button>
                <button
                  onClick={(e) => handleReaction(e, post.id, 'heart')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: userReaction === 'heart' ? (darkMode ? '#2a2a2a' : '#fce7f3') : 'transparent',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '11px',
                    color: theme.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    if (userReaction !== 'heart') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>❤️</span>
                  <span>{reactions[post.id]?.heart || 0}</span>
                </button>
              </div>

              <div style={{
                marginTop: '12px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: theme.textSecondary
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    2h ago
                  </span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <button
                  onClick={(e) => handleUpvote(e, post.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: upvotedPosts.has(post.id) 
                      ? (darkMode ? 'rgba(212, 175, 55, 0.2)' : '#fef3c7') 
                      : 'transparent',
                    border: `1px solid ${upvotedPosts.has(post.id) ? theme.accent : theme.border}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Georgia, serif',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: upvotedPosts.has(post.id) 
                      ? theme.accent 
                      : theme.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    if (!upvotedPosts.has(post.id)) {
                      e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                      e.currentTarget.style.borderColor = theme.accent;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!upvotedPosts.has(post.id)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = theme.border;
                    }
                  }}
                >
                  <ArrowUp 
                    size={16} 
                    strokeWidth={2.5}
                    style={{
<<<<<<< HEAD
                      color: upvotedPosts.has(post.id) ? theme.accent : theme.textSecondary,
                      transform: upvotedPosts.has(post.id) ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  />
                  <span>{upvotes[post.id]}</span>
                </button>
              </div>
            </div>
          )})}
        </div>
      </div>

      {/* Premium Connections Sidebar */}
      {showConnections && (
        <>
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)',
              zIndex: 19,
              backdropFilter: 'blur(4px)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setShowConnections(false)}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 'min(360px, 85vw)',
            height: '100%',
            backgroundColor: theme.surface,
            borderRight: `1px solid ${theme.border}`,
            zIndex: 20,
            boxShadow: darkMode 
              ? '4px 0 24px rgba(0,0,0,0.5)' 
              : '4px 0 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out',
            transition: 'background-color 0.3s ease'
          }}>
            <div style={{ 
              padding: '24px', 
              borderBottom: `2px solid ${theme.accent}`,
              backgroundColor: darkMode ? theme.hover : '#fafafa',
              transition: 'background-color 0.3s ease'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '16px'
              }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontFamily: 'Georgia, serif', 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: theme.text,
                  letterSpacing: '0.1em',
                  transition: 'color 0.3s ease'
                }}>
                  CONNECTIONS
                </h2>
                <button 
                  onClick={() => setShowConnections(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '8px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    color: theme.text
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? theme.border : '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
              
              {/* Search Bar */}
              <div style={{
                position: 'relative',
                marginBottom: '12px'
              }}>
                <Search 
                  size={16} 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.textSecondary
                  }}
                />
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.cardBg,
                    color: theme.text,
                    fontSize: '13px',
                    fontFamily: 'Georgia, serif',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.accent;
                    e.target.style.boxShadow = `0 0 0 3px ${darkMode ? 'rgba(212, 175, 55, 0.1)' : 'rgba(0,0,0,0.05)'}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.border;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <p style={{ 
                fontSize: '11px', 
                fontFamily: 'Georgia, serif', 
                margin: 0,
                color: theme.textSecondary,
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease'
              }}>
                Drag to reorder chronologically
              </p>
            </div>
            <div style={{ 
              overflowY: 'auto',
              flex: 1,
              padding: '8px 0'
            }}>
<<<<<<< HEAD
              {filteredConnections.length > 0 ? (
                filteredConnections.map((name, idx) => {
                  const avatar = getAuthorAvatar(name);
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '16px 24px',
                        borderBottom: `1px solid ${theme.border}`,
                        cursor: 'move',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: avatar.color,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        border: `2px solid ${theme.border}`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        {avatar.initials}
                      </div>
                      <span style={{ 
                        fontSize: '15px', 
                        fontFamily: 'Georgia, serif',
                        color: theme.text,
                        fontWeight: '500',
                        transition: 'color 0.3s ease'
                      }}>
                        {name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: theme.textSecondary
                }}>
                  No connections found
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Premium Full Post Modal */}
      {selectedPost && (
        <div 
          ref={articleRef}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: theme.surface,
            zIndex: 30,
            overflowY: 'auto',
            animation: 'fadeIn 0.3s ease-out',
            transition: 'background-color 0.3s ease'
          }}
        >
          {/* Reading Progress Bar */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: theme.border,
            zIndex: 35
          }}>
            <div style={{
              height: '100%',
              width: `${readingProgress}%`,
              backgroundColor: theme.accent,
              transition: 'width 0.1s ease-out',
              boxShadow: `0 0 10px ${theme.accent}`
            }} />
          </div>
          {/* Premium Modal Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            borderBottom: `1px solid ${theme.border}`,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
            zIndex: 1,
            backdropFilter: 'blur(10px)',
            backgroundColor: darkMode ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
            transition: 'all 0.3s ease'
          }}>
            <button 
              onClick={() => setSelectedPost(null)}
              style={{ 
                padding: '10px', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: theme.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f3f4f6';
                e.currentTarget.style.transform = 'translateX(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <div style={{ flex: 1 }}>
              <p style={{ 
                fontSize: '12px', 
                fontFamily: 'Georgia, serif', 
                margin: 0,
                fontWeight: '600',
                letterSpacing: '0.1em',
                color: theme.textSecondary,
                transition: 'color 0.3s ease'
              }}>
                BACK TO GRID
              </p>
            </div>
<<<<<<< HEAD
            <button
              onClick={(e) => handleBookmark(e, selectedPost.id)}
              style={{
                padding: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: theme.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f3f4f6';
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <Bookmark 
                size={22} 
                strokeWidth={2}
                fill={bookmarkedPosts.has(selectedPost.id) ? theme.accent : 'none'}
                color={bookmarkedPosts.has(selectedPost.id) ? theme.accent : theme.textSecondary}
              />
            </button>
          </div>

          {/* Premium Article Content */}
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '48px 32px',
            backgroundColor: theme.surface,
            transition: 'background-color 0.3s ease'
          }}>
            {/* Premium Byline */}
            <div style={{
              borderTop: `3px solid ${theme.accent}`,
              borderBottom: `3px solid ${theme.accent}`,
              padding: '12px 0',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {(() => {
                  const avatar = getAuthorAvatar(selectedPost.author);
                  return (
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: avatar.color,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      border: `2px solid ${theme.border}`
                    }}>
                      {avatar.initials}
                    </div>
                  );
                })()}
                <p style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  letterSpacing: '0.15em', 
                  margin: 0,
                  color: theme.text,
                  transition: 'color 0.3s ease'
                }}>
                  {selectedPost.author}
                </p>
              </div>
              <div style={{
                padding: '4px 12px',
                backgroundColor: darkMode ? theme.hover : '#f3f4f6',
                borderRadius: '4px'
              }}>
                <p style={{
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  margin: 0,
                  color: theme.textSecondary,
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease'
                }}>
                  {selectedPost.category}
                </p>
              </div>
            </div>

            {/* Premium Headline */}
            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '32px',
              color: theme.text,
              letterSpacing: '-0.02em',
              transition: 'color 0.3s ease'
            }}>
              {selectedPost.headline}
            </h1>

            {/* Premium Meta Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '13px',
              marginBottom: '40px',
              paddingBottom: '24px',
              borderBottom: `1px solid ${theme.border}`,
              color: theme.textSecondary,
              transition: 'all 0.3s ease'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontWeight: '500'
              }}>
                <Clock size={16} />
                2 hours ago
              </span>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>•</span>
              <span style={{ fontWeight: '500' }}>5 min read</span>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>•</span>
              <span style={{ fontWeight: '500' }}>
                <ArrowUp size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                {upvotes[selectedPost.id]} upvotes
              </span>
            </div>

            {/* Premium Featured Image Placeholder */}
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: darkMode ? theme.hover : '#f3f4f6',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: darkMode 
                  ? 'linear-gradient(135deg, #d4af37 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                opacity: darkMode ? 0.15 : 0.1
              }} />
              <span style={{ 
                fontSize: '16px', 
                fontFamily: 'Georgia, serif', 
                color: theme.textSecondary,
                fontWeight: '500',
                letterSpacing: '0.1em',
                zIndex: 1,
                transition: 'color 0.3s ease'
              }}>
                [FEATURED IMAGE]
              </span>
            </div>

            {/* Premium Article Body */}
            <div style={{ 
              fontFamily: 'Georgia, serif', 
              fontSize: '18px', 
              lineHeight: '1.8', 
              textAlign: 'justify',
              color: theme.text,
              maxWidth: '100%',
              transition: 'color 0.3s ease'
            }}>
              <p style={{ 
                marginBottom: '24px',
                fontSize: '20px',
                lineHeight: '1.7',
                color: theme.text
              }}>
                <span style={{ 
                  fontSize: '72px', 
                  fontWeight: 'bold', 
                  float: 'left', 
                  marginRight: '8px', 
                  lineHeight: '0.9',
                  color: theme.accent,
                  fontFamily: 'Georgia, serif',
                  transition: 'color 0.3s ease'
                }}>
                  L
                </span>
                orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
<<<<<<< HEAD
              <p style={{ marginBottom: '24px', color: theme.text }}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <p style={{ marginBottom: '24px', color: theme.text }}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <p style={{ marginBottom: '24px', color: theme.text }}>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>

              {/* Premium Pull Quote */}
              <div style={{
                margin: '40px 0',
                padding: '32px 40px',
                borderLeft: `5px solid ${theme.accent}`,
                backgroundColor: darkMode ? theme.hover : '#f9fafb',
                borderRadius: '0 8px 8px 0',
                boxShadow: darkMode 
                  ? '0 4px 12px rgba(0,0,0,0.3)' 
                  : '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}>
                <p style={{ 
                  fontSize: '24px', 
                  fontFamily: 'Georgia, serif', 
                  fontStyle: 'italic', 
                  margin: 0,
                  lineHeight: '1.6',
                  color: theme.text,
                  fontWeight: '500',
                  transition: 'color 0.3s ease'
                }}>
                  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
                </p>
              </div>

              <p style={{ marginBottom: '24px', color: theme.text }}>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>

              <p style={{ marginBottom: '24px', color: theme.text }}>
                Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
              </p>
            </div>

            {/* Premium Engagement Actions */}
            <div style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: `2px solid ${theme.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '48px',
              flexWrap: 'wrap',
              transition: 'border-color 0.3s ease'
            }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                color: theme.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <Heart size={28} strokeWidth={2} />
                <span style={{ 
                  fontSize: '13px', 
                  fontFamily: 'Georgia, serif',
                  fontWeight: '600',
                  color: theme.textSecondary,
                  transition: 'color 0.3s ease'
                }}>
                  {reactions[selectedPost.id]?.heart || 234}
                </span>
              </button>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                color: theme.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <MessageCircle size={28} strokeWidth={2} />
                <span style={{ 
                  fontSize: '13px', 
                  fontFamily: 'Georgia, serif',
                  fontWeight: '600',
                  color: theme.textSecondary,
                  transition: 'color 0.3s ease'
                }}>
                  45
                </span>
              </button>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                color: theme.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darkMode ? theme.hover : '#f9fafb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <Share2 size={28} strokeWidth={2} />
                <span style={{ 
                  fontSize: '13px', 
                  fontFamily: 'Georgia, serif',
                  fontWeight: '600',
<<<<<<< HEAD
                  color: theme.textSecondary,
                  transition: 'color 0.3s ease'
                }}>
                  Share
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}