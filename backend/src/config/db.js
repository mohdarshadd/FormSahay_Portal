const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isFallback = false;
const fallbackFilePath = path.join(__dirname, '../../db_fallback.json');

// Initialize JSON database fallback structure if not exists
const initFallbackFile = () => {
  if (!fs.existsSync(fallbackFilePath)) {
    const defaultData = {
      users: [],
      documents: [],
      applications: [],
      schemes: [],
      notifications: []
    };
    fs.writeFileSync(fallbackFilePath, JSON.stringify(defaultData, null, 2));
  }
};

const readFallbackDb = () => {
  initFallbackFile();
  try {
    const data = fs.readFileSync(fallbackFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading local DB file, returning empty structure", err);
    return { users: [], documents: [], applications: [], schemes: [], notifications: [] };
  }
};

const writeFallbackDb = (data) => {
  try {
    fs.writeFileSync(fallbackFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing to local DB file", err);
  }
};

const generateId = () => {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("⚠️  No MONGODB_URI found in environment variables. Activating Local JSON Database Fallback Mode.");
    isFallback = true;
    initFallbackFile();
    return;
  }

  try {
    // Try to connect with a short timeout to prevent long hangs on cold starts
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB Connected successfully.");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("⚠️  Falling back to Local JSON Database Mode.");
    isFallback = true;
    initFallbackFile();
  }
};

// Unified Repository Methods
const dbService = {
  isFallback: () => isFallback,

  // Users
  createUser: async (userData) => {
    if (!isFallback) {
      const User = require('../models/User');
      const user = new User(userData);
      return await user.save();
    } else {
      const db = readFallbackDb();
      const newUser = {
        _id: generateId(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.users.push(newUser);
      writeFallbackDb(db);
      return newUser;
    }
  },

  getUser: async (id) => {
    if (!isFallback) {
      const User = require('../models/User');
      return await User.findById(id);
    } else {
      const db = readFallbackDb();
      return db.users.find(u => u._id === id.toString()) || null;
    }
  },

  getUsers: async () => {
    if (!isFallback) {
      const User = require('../models/User');
      return await User.find({});
    } else {
      const db = readFallbackDb();
      return db.users;
    }
  },

  updateUser: async (id, userData) => {
    if (!isFallback) {
      const User = require('../models/User');
      return await User.findByIdAndUpdate(id, userData, { new: true });
    } else {
      const db = readFallbackDb();
      const idx = db.users.findIndex(u => u._id === id.toString());
      if (idx !== -1) {
        db.users[idx] = {
          ...db.users[idx],
          ...userData,
          updatedAt: new Date().toISOString()
        };
        writeFallbackDb(db);
        return db.users[idx];
      }
      return null;
    }
  },

  // Documents
  createDocument: async (docData) => {
    if (!isFallback) {
      const Document = require('../models/Document');
      const doc = new Document(docData);
      return await doc.save();
    } else {
      const db = readFallbackDb();
      const newDoc = {
        _id: generateId(),
        ...docData,
        userId: docData.userId.toString(),
        uploadDate: new Date().toISOString(),
        status: docData.status || 'missing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.documents.push(newDoc);
      writeFallbackDb(db);
      return newDoc;
    }
  },

  getDocuments: async (userId) => {
    if (!isFallback) {
      const Document = require('../models/Document');
      return await Document.find({ userId });
    } else {
      const db = readFallbackDb();
      return db.documents.filter(d => d.userId === userId.toString());
    }
  },

  updateDocument: async (id, docData) => {
    if (!isFallback) {
      const Document = require('../models/Document');
      return await Document.findByIdAndUpdate(id, docData, { new: true });
    } else {
      const db = readFallbackDb();
      const idx = db.documents.findIndex(d => d._id === id.toString());
      if (idx !== -1) {
        db.documents[idx] = {
          ...db.documents[idx],
          ...docData,
          updatedAt: new Date().toISOString()
        };
        writeFallbackDb(db);
        return db.documents[idx];
      }
      return null;
    }
  },

  deleteDocument: async (id) => {
    if (!isFallback) {
      const Document = require('../models/Document');
      return await Document.findByIdAndDelete(id);
    } else {
      const db = readFallbackDb();
      const idx = db.documents.findIndex(d => d._id === id.toString());
      if (idx !== -1) {
        const deleted = db.documents.splice(idx, 1)[0];
        writeFallbackDb(db);
        return deleted;
      }
      return null;
    }
  },

  // Applications
  createApplication: async (appData) => {
    if (!isFallback) {
      const Application = require('../models/Application');
      const app = new Application(appData);
      return await app.save();
    } else {
      const db = readFallbackDb();
      const newApp = {
        _id: generateId(),
        ...appData,
        userId: appData.userId.toString(),
        schemeId: appData.schemeId.toString(),
        progress: appData.progress || 'not_started',
        currentStage: appData.currentStage || 'Draft',
        status: appData.status || 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.applications.push(newApp);
      writeFallbackDb(db);
      return newApp;
    }
  },

  getApplications: async (userId) => {
    if (!isFallback) {
      const Application = require('../models/Application');
      return await Application.find({ userId });
    } else {
      const db = readFallbackDb();
      return db.applications.filter(a => a.userId === userId.toString());
    }
  },

  updateApplication: async (id, appData) => {
    if (!isFallback) {
      const Application = require('../models/Application');
      return await Application.findByIdAndUpdate(id, appData, { new: true });
    } else {
      const db = readFallbackDb();
      const idx = db.applications.findIndex(a => a._id === id.toString());
      if (idx !== -1) {
        db.applications[idx] = {
          ...db.applications[idx],
          ...appData,
          updatedAt: new Date().toISOString()
        };
        writeFallbackDb(db);
        return db.applications[idx];
      }
      return null;
    }
  },

  deleteApplication: async (id) => {
    if (!isFallback) {
      const Application = require('../models/Application');
      return await Application.findByIdAndDelete(id);
    } else {
      const db = readFallbackDb();
      const idx = db.applications.findIndex(a => a._id === id.toString());
      if (idx !== -1) {
        const deleted = db.applications.splice(idx, 1)[0];
        writeFallbackDb(db);
        return deleted;
      }
      return null;
    }
  },

  // Schemes
  createScheme: async (schemeData) => {
    if (!isFallback) {
      const Scheme = require('../models/Scheme');
      const scheme = new Scheme(schemeData);
      return await scheme.save();
    } else {
      const db = readFallbackDb();
      const newScheme = {
        _id: generateId(),
        ...schemeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.schemes.push(newScheme);
      writeFallbackDb(db);
      return newScheme;
    }
  },

  getSchemes: async (query = {}) => {
    if (!isFallback) {
      const Scheme = require('../models/Scheme');
      return await Scheme.find(query);
    } else {
      const db = readFallbackDb();
      let filtered = [...db.schemes];
      
      // Simple filter evaluation matching common key searches
      if (query.state && query.state !== 'All') {
        filtered = filtered.filter(s => s.eligibility.state === 'All' || s.eligibility.state === query.state);
      }
      
      return filtered;
    }
  },

  getScheme: async (id) => {
    if (!isFallback) {
      const Scheme = require('../models/Scheme');
      return await Scheme.findById(id);
    } else {
      const db = readFallbackDb();
      return db.schemes.find(s => s._id === id.toString()) || null;
    }
  },

  clearSchemes: async () => {
    if (!isFallback) {
      const Scheme = require('../models/Scheme');
      await Scheme.deleteMany({});
    } else {
      const db = readFallbackDb();
      db.schemes = [];
      writeFallbackDb(db);
    }
  },

  // Notifications
  createNotification: async (notifData) => {
    if (!isFallback) {
      const Notification = require('../models/Notification');
      const notif = new Notification(notifData);
      return await notif.save();
    } else {
      const db = readFallbackDb();
      const newNotif = {
        _id: generateId(),
        ...notifData,
        userId: notifData.userId.toString(),
        sent: notifData.sent || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.notifications.push(newNotif);
      writeFallbackDb(db);
      return newNotif;
    }
  },

  getNotifications: async (userId) => {
    if (!isFallback) {
      const Notification = require('../models/Notification');
      return await Notification.find({ userId }).sort({ createdAt: -1 });
    } else {
      const db = readFallbackDb();
      return db.notifications
        .filter(n => n.userId === userId.toString())
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },

  updateNotification: async (id, notifData) => {
    if (!isFallback) {
      const Notification = require('../models/Notification');
      return await Notification.findByIdAndUpdate(id, notifData, { new: true });
    } else {
      const db = readFallbackDb();
      const idx = db.notifications.findIndex(n => n._id === id.toString());
      if (idx !== -1) {
        db.notifications[idx] = {
          ...db.notifications[idx],
          ...notifData,
          updatedAt: new Date().toISOString()
        };
        writeFallbackDb(db);
        return db.notifications[idx];
      }
      return null;
    }
  }
};

module.exports = { connectDB, dbService };
