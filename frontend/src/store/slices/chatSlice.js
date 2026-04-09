import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

/** Sends a user message to the AI and receives a contextual response with optimistic UI updates. */
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, sessionId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/chat/message', { message, sessionId });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

/** Fetches all chat sessions for the authenticated user. */
export const fetchSessions = createAsyncThunk(
  'chat/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/chat/sessions');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load history');
    }
  }
);

/** Loads a single chat session with all its messages. */
export const fetchSessionDetails = createAsyncThunk(
  'chat/fetchSessionDetails',
  async (sessionId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/chat/sessions/${sessionId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load chat');
    }
  }
);

/** Deletes a chat session from the user's history. */
export const deleteSession = createAsyncThunk(
  'chat/deleteSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      await api.delete(`/chat/sessions/${sessionId}`);
      return sessionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete chat');
    }
  }
);

const initialState = {
  isPanelOpen: false,
  sessions: [],
  activeSessionId: null,
  messages: [],
  isLoading: false,
  isHistoryOpen: false,
  isHistoryLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChatPanel: (state) => {
      state.isPanelOpen = !state.isPanelOpen;
    },
    setChatPanelOpen: (state, action) => {
      state.isPanelOpen = action.payload;
    },
    toggleHistory: (state) => {
      state.isHistoryOpen = !state.isHistoryOpen;
    },
    setHistoryOpen: (state, action) => {
      state.isHistoryOpen = action.payload;
    },
    startNewChat: (state) => {
      state.activeSessionId = null;
      state.messages = [];
      state.error = null;
    },
    clearChatError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.isHistoryLoading = true;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.isHistoryLoading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state) => {
        state.isHistoryLoading = false;
      })

      .addCase(fetchSessionDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSessionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeSessionId = action.payload._id;
        state.messages = action.payload.messages;
      })
      .addCase(fetchSessionDetails.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.messages.push({ role: 'user', content: action.meta.arg.message });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;

        if (!state.activeSessionId || state.activeSessionId !== action.payload.sessionId) {
            state.sessions.unshift({
                _id: action.payload.sessionId,
                title: action.payload.title,
                updatedAt: action.payload.updatedAt,
                createdAt: action.payload.updatedAt
            });
        }

        state.activeSessionId = action.payload.sessionId;
        state.messages.push({ role: 'model', content: action.payload.reply });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.messages.push({
            role: 'model',
            content: "I'm having trouble fetching your data. Please try again in a moment."
        });
      })

      .addCase(deleteSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((session) => session._id !== action.payload);
        if (state.activeSessionId === action.payload) {
          state.activeSessionId = null;
          state.messages = [];
        }
      });
  },
});

export const { toggleChatPanel, setChatPanelOpen, toggleHistory, setHistoryOpen, startNewChat, clearChatError } = chatSlice.actions;
export default chatSlice.reducer;
