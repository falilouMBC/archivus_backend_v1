# 📚 Archivus Backend API

> **API REST moderne** pour l'application Archivus - Système de gestion d'archives

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

## ✨ Fonctionnalités principales

| Fonctionnalité | Description |
|----------------|-------------|
| 🔐 **Authentification JWT** | Inscription, connexion sécurisée, gestion des utilisateurs |
| 📝 **Gestion des fiches** | CRUD complet pour les fiches |
| 📖 **Documentation Swagger** | Interface interactive pour tester l'API |
| 🛡️ **Sécurité avancée** | Rate limiting, validation, protection des headers |

## 📋 Prérequis

- **Node.js** 18+ 
- **MongoDB** (local ou cloud)
- **Docker** (optionnel, pour MongoDB local)

## 🚀 Installation rapide

### 1. Cloner le projet
```bash
git clone <repository-url>
cd archivus_backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Créer un fichier `.env` à la racine :
```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/archivus_db

# JWT Secret (générez une clé sécurisée)
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Server Configuration
PORT=5000
```

### 4. Démarrer MongoDB
```bash
# Option 1: Avec Docker (recommandé)
docker-compose up -d

# Option 2: MongoDB local
mongod
```

### 5. Démarrer le serveur
```bash
# Développement
npm run dev

# Production
npm run build && npm start
```

## 📚 Documentation API

### 🔐 Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/auth/register` | Inscription d'un nouvel utilisateur |
| `POST` | `/api/auth/login` | Connexion utilisateur |
| `POST` | `/api/auth/logout` | Déconnexion |
| `GET` | `/api/auth/user/:id` | Récupérer un utilisateur |
| `GET` | `/api/auth/users` | Liste de tous les utilisateurs |

### 📝 Gestion des fiches
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/fiches` | Créer une fiche |
| `GET` | `/api/fiches/user/:userId` | Fiches d'un utilisateur |
| `GET` | `/api/fiches/:id` | Récupérer une fiche |
| `PUT` | `/api/fiches/:id` | Modifier une fiche |
| `DELETE` | `/api/fiches/:id` | Supprimer une fiche |
| `GET` | `/api/fiches/search/:title` | Rechercher par titre |

## 📖 Documentation interactive

- **Swagger UI** : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **API Base** : [http://localhost:5000/](http://localhost:5000/)

## 🔧 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Développement avec nodemon |
| `npm run build` | Compilation TypeScript |
| `npm start` | Mode production |

## 🛡️ Sécurité

- **JWT** : Authentification par tokens
- **Rate Limiting** : Protection contre les attaques par déni de service
- **Validation** : Contrôle strict des données d'entrée
- **Headers** : Protection des en-têtes HTTP sensibles

## 📁 Architecture du projet

```
archivus_backend/
├── 📁 src/
│   ├── 📁 config/          # Configuration (DB, Swagger)
│   ├── 📁 controllers/     # Contrôleurs des routes
│   ├── 📁 middlewares/     # Middlewares (auth, sécurité)
│   ├── 📁 models/          # Modèles Mongoose
│   ├── 📁 routes/          # Définition des routes
│   ├── 📁 services/        # Logique métier
│   ├── 📁 types/           # Types TypeScript
│   └── 📄 server.ts        # Point d'entrée
├── 📁 scripts/             # Scripts utilitaires
├── 📁 dist/                # Build de production
├── 📄 docker-compose.yml   # Configuration MongoDB
└── 📄 package.json         # Dépendances et scripts
```

## 🚀 Déploiement

### Production
```bash
# 1. Compiler le projet
npm run build

# 2. Configurer les variables d'environnement
cp .env.example .env

# 3. Démarrer en production
npm start
```

### Docker
```bash
# Démarrer MongoDB avec Docker
docker-compose up -d

# Le serveur se connecte automatiquement
npm run dev
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence ISC. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">
  <p>Fait avec ❤️ pour Archivus</p>
  <p>🚀 <strong>API REST moderne avec IA</strong> 🚀</p>
</div>