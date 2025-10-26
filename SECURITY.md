# Guide de Sécurité - Archivus Backend

## 🔒 Mesures de Sécurité Implémentées

### 1. Protection des Headers HTTP (Helmet)
- Protection XSS
- Protection clickjacking
- Sécurisation des headers HTTP
- HSTS activé (Force HTTPS)
- Content Security Policy configurée

### 2. Rate Limiting
- **Global** : 100 requêtes par 15 minutes par IP
- **Authentification** : 5 tentatives par 15 minutes (login/register)
- Protection contre les attaques par force brute

### 3. Validation des Données
- Limite de taille des requêtes : 10MB
- Validation des entrées utilisateur
- Protection contre les injections

### 4. JWT (JSON Web Tokens)
- Token d'expiration : 15 minutes
- Token signé avec secret fort
- Middleware d'authentification et d'autorisation

### 5. Hachage des Mots de Passe
- bcryptjs avec salt de 10 rounds
- Mots de passe jamais stockés en clair
- Validation de longueur minimale (8 caractères)

## 📦 Packages de Sécurité Requis

```bash
# Installation des packages
npm install helmet express-rate-limit bcryptjs jsonwebtoken
npm install -D @types/express-rate-limit @types/bcryptjs @types/jsonwebtoken
```

## 🛠️ Gérer les Vulnérabilités NPM

### Audit de Sécurité
```bash
# 1. Vérifier les vulnérabilités
npm audit

# 2. Voir le rapport détaillé
npm audit --json

# 3. Corriger automatiquement (sans breaking changes)
npm audit fix

# 4. Si nécessaire, forcer les corrections (attention aux breaking changes)
npm audit fix --force

# 5. Mettre à jour tous les packages
npm update

# 6. Mettre à jour vers les dernières versions majeures
npm outdated
npm install package@latest
```

### Packages à Surveiller
- `swagger-ui-express` : Peut avoir des vulnérabilités dans ses dépendances
- `jsonwebtoken` : Toujours utiliser la dernière version
- `mongoose` : Mettre à jour régulièrement

## 🔐 Variables d'Environnement

Créez un fichier `.env` à la racine avec :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/archivus_db
JWT_SECRET=votre_secret_jwt_tres_securise_ici_minimum_32_caracteres
NODE_ENV=development
```

### Générer un JWT Secret Fort

```bash
# Linux/Mac
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🚨 Vulnérabilités Courantes de Swagger

### Problème
`swagger-ui-express` peut avoir des vulnérabilités dans ses dépendances (notamment dans `dompurify`, `sanitize-html`, etc.)

### Solutions

**Option 1 : Mise à jour**
```bash
npm update swagger-ui-express swagger-jsdoc
```

**Option 2 : Overrides (npm 8.3+)**
Ajoutez dans `package.json` :
```json
{
  "overrides": {
    "swagger-ui-express": {
      "dompurify": "^3.0.0"
    }
  }
}
```

**Option 3 : Désactiver Swagger en Production**
Dans `server.ts` :
```typescript
if (process.env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
```

## 📋 Checklist de Sécurité

- [x] Helmet configuré
- [x] Rate limiting activé
- [x] Mots de passe hachés avec bcrypt
- [x] JWT avec expiration courte
- [x] Validation des entrées
- [x] Limite de taille des requêtes
- [x] CORS configuré
- [ ] Ajouter des logs de sécurité
- [ ] Implémenter refresh tokens
- [ ] Ajouter une liste noire de tokens (blacklist)
- [ ] Activer HTTPS en production
- [ ] Configurer des variables d'environnement sécurisées
- [ ] Mettre en place une stratégie de backup MongoDB
- [ ] Activer l'authentification MongoDB en production

## 🎯 Bonnes Pratiques

1. **Ne jamais commiter le fichier `.env`**
2. **Utiliser des secrets forts et aléatoires**
3. **Mettre à jour régulièrement les dépendances**
4. **Monitorer les vulnérabilités avec `npm audit`**
5. **Désactiver Swagger en production**
6. **Utiliser HTTPS en production**
7. **Limiter les tentatives de connexion**
8. **Logger les activités suspectes**

## 🔄 Commandes de Maintenance Régulière

```bash
# Chaque semaine
npm audit
npm outdated

# Chaque mois
npm update
npm audit fix

# Avant chaque déploiement
npm audit
npm test
npm run build
```

## 📞 En Cas de Vulnérabilité Critique

1. Vérifier la nature de la vulnérabilité : `npm audit`
2. Chercher des patches disponibles : `npm audit fix`
3. Consulter GitHub Security Advisories
4. Si pas de solution immédiate : désactiver la fonctionnalité concernée
5. Envisager une alternative au package vulnérable

## 🔗 Ressources Utiles

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)

