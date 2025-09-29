import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  verified: boolean;
  followers: number;
  following: number;
  badges: string[];
  joinDate: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  fingerprintNumber: string;
  streak: number;
  isStaff?: boolean;
  isCEO?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isPinned?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface SocialState {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  messages: Message[];
  followedUsers: Set<string>;
  likedPosts: Set<string>;
  trendingHashtags: string[];
  
  // Actions
  setCurrentUser: (user: User) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  createPost: (content: string, hashtags: string[], images?: string[]) => void;
  sendMessage: (receiverId: string, content: string) => void;
  markMessageAsRead: (messageId: string) => void;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    username: 'alexr',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital entrepreneur building the future 🚀 #NeonPioneer',
    verified: true,
    followers: 12500,
    following: 340,
    badges: ['Neon Pioneer', 'Business Pro', 'Trendsetter'],
    joinDate: '2024-01-15',
    plan: 'Enterprise',
    fingerprintNumber: 'NTC-2024-001',
    streak: 47
  },
  {
    id: '2',
    name: 'Maya Chen',
    username: 'mayac',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2d6cac8?w=150&h=150&fit=crop&crop=face',
    bio: 'Creative director & visual storyteller ✨',
    verified: true,
    followers: 8900,
    following: 567,
    badges: ['Trendsetter', 'Creative'],
    joinDate: '2024-02-10',
    plan: 'Pro',
    fingerprintNumber: 'NTC-2024-002',
    streak: 23
  },
  {
    id: '3',
    name: 'David Park',
    username: 'davidp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech investor | Building tomorrow\'s startups 💡',
    verified: true,
    followers: 15200,
    following: 89,
    badges: ['Investor', 'Business Pro', 'Neon Pioneer'],
    joinDate: '2024-01-20',
    plan: 'Enterprise',
    fingerprintNumber: 'NTC-2024-003',
    streak: 12
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just launched my new digital fingerprint! The future of personal branding is here. What do you think? #neon #digitalidentity #future',
    hashtags: ['neon', 'digitalidentity', 'future'],
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: '2024-12-29T10:30:00Z',
    isPinned: true
  },
  {
    id: '2',
    userId: '2',
    content: 'Working on a new visual identity project. The intersection of luxury and technology never gets old ✨ #design #luxury #tech',
    images: ['https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&fit=crop'],
    hashtags: ['design', 'luxury', 'tech'],
    likes: 189,
    comments: 23,
    shares: 8,
    timestamp: '2024-12-29T08:15:00Z'
  },
  {
    id: '3',
    userId: '3',
    content: 'The creator economy is evolving. Platforms like Neon Tech are leading the charge in democratizing digital presence. Exciting times ahead! #investing #creatoreconomy #innovation',
    hashtags: ['investing', 'creatoreconomy', 'innovation'],
    likes: 456,
    comments: 67,
    shares: 34,
    timestamp: '2024-12-29T06:45:00Z'
  }
];

export const useSocialStore = create<SocialState>((set, get) => ({
  currentUser: mockUsers[0], // Simulate logged in user
  users: mockUsers,
  posts: mockPosts,
  messages: [],
  followedUsers: new Set(['2', '3']),
  likedPosts: new Set(['2']),
  trendingHashtags: ['#neon', '#digitalidentity', '#luxury', '#tech', '#future', '#business', '#design'],

  setCurrentUser: (user) => set({ currentUser: user }),

  followUser: (userId) => set((state) => {
    const newFollowedUsers = new Set(state.followedUsers);
    newFollowedUsers.add(userId);
    
    // Update follower count
    const updatedUsers = state.users.map(user => 
      user.id === userId 
        ? { ...user, followers: user.followers + 1 }
        : user
    );
    
    return { 
      followedUsers: newFollowedUsers,
      users: updatedUsers
    };
  }),

  unfollowUser: (userId) => set((state) => {
    const newFollowedUsers = new Set(state.followedUsers);
    newFollowedUsers.delete(userId);
    
    // Update follower count
    const updatedUsers = state.users.map(user => 
      user.id === userId 
        ? { ...user, followers: Math.max(0, user.followers - 1) }
        : user
    );
    
    return { 
      followedUsers: newFollowedUsers,
      users: updatedUsers
    };
  }),

  likePost: (postId) => set((state) => {
    const newLikedPosts = new Set(state.likedPosts);
    newLikedPosts.add(postId);
    
    const updatedPosts = state.posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    );
    
    return { 
      likedPosts: newLikedPosts,
      posts: updatedPosts
    };
  }),

  unlikePost: (postId) => set((state) => {
    const newLikedPosts = new Set(state.likedPosts);
    newLikedPosts.delete(postId);
    
    const updatedPosts = state.posts.map(post => 
      post.id === postId 
        ? { ...post, likes: Math.max(0, post.likes - 1) }
        : post
    );
    
    return { 
      likedPosts: newLikedPosts,
      posts: updatedPosts
    };
  }),

  createPost: (content, hashtags, images) => set((state) => {
    if (!state.currentUser) return state;
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: state.currentUser.id,
      content,
      hashtags,
      images,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString()
    };
    
    return { posts: [newPost, ...state.posts] };
  }),

  sendMessage: (receiverId, content) => set((state) => {
    if (!state.currentUser) return state;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: state.currentUser.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    return { messages: [...state.messages, newMessage] };
  }),

  markMessageAsRead: (messageId) => set((state) => ({
    messages: state.messages.map(message => 
      message.id === messageId 
        ? { ...message, read: true }
        : message
    )
  }))
}));