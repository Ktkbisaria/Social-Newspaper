import React, { useState } from 'react';
import { X, Menu, Clock, Heart, MessageCircle, Share2, ChevronLeft, ArrowUp } from 'lucide-react';

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

  const connections = [
    'ELIZABETH WARREN', 'MARCUS JOHNSON', 'SOPHIE ANDERSON', 'ALEXANDER GREY',
    'JENNIFER SMITH', 'WILLIAM BROWN', 'CATHERINE EVANS', 'RICHARD TAYLOR'
  ];

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const handleUpvote = (e, postId) => {
    e.stopPropagation(); // Prevent opening the post when clicking upvote
    if (upvotedPosts.has(postId)) {
      // Remove upvote
      setUpvotes(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
      setUpvotedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      // Add upvote
      setUpvotes(prev => ({ ...prev, [postId]: prev[postId] + 1 }));
      setUpvotedPosts(prev => new Set(prev).add(postId));
    }
  };

  const filteredPosts = activeCategory === 'Technology' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#fafafa',
      overflow: 'hidden',
      fontFamily: 'Georgia, "Times New Roman", serif'
    }}>
      {/* Premium Masthead Header */}
      <div style={{ 
        borderBottom: '3px solid #1a1a1a', 
        padding: '20px 24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 10
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
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
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
              color: '#1a1a1a',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              THE CHRONICLE
            </h1>
            <p style={{ 
              fontSize: '11px', 
              letterSpacing: '0.2em', 
              marginTop: '6px',
              color: '#666',
              fontWeight: '500'
            }}>
              WEDNESDAY, DECEMBER 10, 2025
            </p>
          </div>
          <div style={{ width: '42px' }}></div>
        </div>

        {/* Premium Category Tabs */}
        <div style={{ 
          overflowX: 'auto', 
          marginTop: '16px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '32px', 
            minWidth: 'max-content', 
            padding: '0 12px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontSize: '12px',
                  fontFamily: 'Georgia, serif',
                  whiteSpace: 'nowrap',
                  paddingBottom: '12px',
                  paddingTop: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: activeCategory === cat ? '3px solid #1a1a1a' : '3px solid transparent',
                  fontWeight: activeCategory === cat ? 'bold' : '500',
                  color: activeCategory === cat ? '#1a1a1a' : '#6b7280',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  marginBottom: '-1px'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.color = '#1a1a1a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.color = '#6b7280';
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
        backgroundColor: '#fafafa'
      }}>
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '20px',
          paddingBottom: '24px'
        }}>
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => openPost(post)}
              style={{
                backgroundColor: '#ffffff',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={{ fontFamily: 'Georgia, serif' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  marginBottom: '12px'
                }}>
                  <p style={{ 
                    fontSize: '10px', 
                    fontWeight: '600', 
                    letterSpacing: '0.08em', 
                    margin: 0,
                    color: '#4b5563',
                    textTransform: 'uppercase'
                  }}>
                    {post.category}
                  </p>
                </div>
                <p style={{ 
                  fontSize: '11px', 
                  fontWeight: 'bold', 
                  letterSpacing: '0.1em', 
                  marginBottom: '10px',
                  color: '#1a1a1a'
                }}>
                  {post.author}
                </p>
                <h3 style={{ 
                  fontSize: '18px', 
                  lineHeight: '1.4', 
                  fontFamily: 'Georgia, serif', 
                  margin: 0,
                  color: '#111827',
                  fontWeight: '600'
                }}>
                  {post.headline}
                </h3>
              </div>
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#6b7280'
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
                    background: upvotedPosts.has(post.id) ? '#fef3c7' : 'transparent',
                    border: `1px solid ${upvotedPosts.has(post.id) ? '#fbbf24' : '#e5e7eb'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Georgia, serif',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: upvotedPosts.has(post.id) ? '#92400e' : '#6b7280'
                  }}
                  onMouseEnter={(e) => {
                    if (!upvotedPosts.has(post.id)) {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!upvotedPosts.has(post.id)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }
                  }}
                >
                  <ArrowUp 
                    size={16} 
                    strokeWidth={2.5}
                    style={{
                      color: upvotedPosts.has(post.id) ? '#f59e0b' : '#6b7280',
                      transform: upvotedPosts.has(post.id) ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  />
                  <span>{upvotes[post.id]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Connections Sidebar */}
      {showConnections && (
        <>
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 19,
              backdropFilter: 'blur(2px)'
            }}
            onClick={() => setShowConnections(false)}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 'min(320px, 85vw)',
            height: '100%',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e5e7eb',
            zIndex: 20,
            boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <div style={{ 
              padding: '24px', 
              borderBottom: '2px solid #1a1a1a',
              backgroundColor: '#fafafa'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '8px' 
              }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontFamily: 'Georgia, serif', 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: '#1a1a1a',
                  letterSpacing: '0.1em'
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
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
              <p style={{ 
                fontSize: '11px', 
                fontFamily: 'Georgia, serif', 
                margin: 0,
                color: '#6b7280',
                letterSpacing: '0.05em'
              }}>
                Drag to reorder chronologically
              </p>
            </div>
            <div style={{ 
              overflowY: 'auto',
              flex: 1,
              padding: '8px 0'
            }}>
              {connections.map((name, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'move',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <span style={{ 
                    fontSize: '15px', 
                    fontFamily: 'Georgia, serif',
                    color: '#111827',
                    fontWeight: '500'
                  }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Premium Full Post Modal */}
      {selectedPost && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#ffffff',
          zIndex: 30,
          overflowY: 'auto',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {/* Premium Modal Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            zIndex: 1,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.95)'
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
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                color: '#4b5563'
              }}>
                BACK TO GRID
              </p>
            </div>
          </div>

          {/* Premium Article Content */}
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '48px 32px',
            backgroundColor: '#ffffff'
          }}>
            {/* Premium Byline */}
            <div style={{
              borderTop: '3px solid #1a1a1a',
              borderBottom: '3px solid #1a1a1a',
              padding: '12px 0',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <p style={{ 
                fontSize: '12px', 
                fontWeight: 'bold', 
                letterSpacing: '0.15em', 
                margin: 0,
                color: '#1a1a1a'
              }}>
                {selectedPost.author}
              </p>
              <div style={{
                padding: '4px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px'
              }}>
                <p style={{
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  margin: 0,
                  color: '#4b5563',
                  textTransform: 'uppercase'
                }}>
                  {selectedPost.category}
                </p>
              </div>
            </div>

            {/* Premium Headline */}
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '24px',
              color: '#111827',
              letterSpacing: '-0.02em'
            }}>
              {selectedPost.headline}
            </h1>

            {/* Premium Meta Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '13px',
              marginBottom: '32px',
              paddingBottom: '20px',
              borderBottom: '1px solid #e5e7eb',
              color: '#6b7280'
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
            </div>

            {/* Premium Featured Image Placeholder */}
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#f3f4f6',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                opacity: 0.1
              }} />
              <span style={{ 
                fontSize: '16px', 
                fontFamily: 'Georgia, serif', 
                color: '#9ca3af',
                fontWeight: '500',
                letterSpacing: '0.1em',
                zIndex: 1
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
              color: '#374151',
              maxWidth: '100%'
            }}>
              <p style={{ 
                marginBottom: '24px',
                fontSize: '20px',
                lineHeight: '1.7'
              }}>
                <span style={{ 
                  fontSize: '72px', 
                  fontWeight: 'bold', 
                  float: 'left', 
                  marginRight: '8px', 
                  lineHeight: '0.9',
                  color: '#1a1a1a',
                  fontFamily: 'Georgia, serif'
                }}>
                  L
                </span>
                orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <p style={{ marginBottom: '24px' }}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <p style={{ marginBottom: '24px' }}>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>

              {/* Premium Pull Quote */}
              <div style={{
                margin: '40px 0',
                padding: '32px 40px',
                borderLeft: '5px solid #1a1a1a',
                backgroundColor: '#f9fafb',
                borderRadius: '0 8px 8px 0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <p style={{ 
                  fontSize: '24px', 
                  fontFamily: 'Georgia, serif', 
                  fontStyle: 'italic', 
                  margin: 0,
                  lineHeight: '1.6',
                  color: '#1f2937',
                  fontWeight: '500'
                }}>
                  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
                </p>
              </div>

              <p style={{ marginBottom: '24px' }}>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>

              <p style={{ marginBottom: '24px' }}>
                Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
              </p>
            </div>

            {/* Premium Engagement Actions */}
            <div style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '2px solid #1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '48px',
              flexWrap: 'wrap'
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
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
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
                  color: '#4b5563'
                }}>
                  234
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
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
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
                  color: '#4b5563'
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
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
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
                  color: '#4b5563'
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