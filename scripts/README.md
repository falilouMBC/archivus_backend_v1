# 🧪 Scripts de vérification Gemini

> **Outils de diagnostic** pour tester et vérifier les modèles Gemini disponibles dans votre région

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

## 📁 Contenu du dossier

| Fichier | Description |
|---------|-------------|
| `list-gemini-models.ts` | **Script TypeScript** (recommandé) |
| `list-gemini-models.js` | **Script JavaScript** (alternative) |
| `README.md` | Cette documentation |

## 🚀 Utilisation rapide

### 📋 Lister tous les modèles disponibles
```bash
# Version TypeScript (recommandée)
npm run list-models

# Version JavaScript
npm run list-models-js
```

### 🎯 Tester un modèle spécifique
```bash
# Tester gemini-pro
npm run test-model gemini-pro

# Tester gemini-pro-vision
npm run test-model gemini-pro-vision

# Tester gemini-1.5-flash
npm run test-model gemini-1.5-flash
```

## 📋 Modèles testés automatiquement

| Modèle | Type | Description |
|--------|------|-------------|
| `gemini-pro` | 📝 Texte | Modèle général pour le texte |
| `gemini-pro-vision` | 🖼️ Multimodal | Modèle pour images + texte |
| `gemini-1.5-pro` | 📝 Texte | Version 1.5 Pro (plus récent) |
| `gemini-1.5-flash` | ⚡ Rapide | Version 1.5 Flash (plus rapide) |
| `gemini-1.0-pro` | 📝 Texte | Version 1.0 Pro (stable) |
| `gemini-1.0-pro-vision` | 🖼️ Multimodal | Version 1.0 Pro Vision |

## ⚙️ Configuration requise

### 1. Variables d'environnement
Assurez-vous d'avoir dans votre fichier `.env` :
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 2. Obtenir une clé API
1. Visitez [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez un compte Google
3. Générez une nouvelle clé API
4. Copiez-la dans votre fichier `.env`

## 📊 Exemple de sortie

```bash
🚀 Script de vérification des modèles Gemini
==================================================
🔍 Recherche des modèles Gemini disponibles dans votre région...

📋 Test des modèles:

⏳ Test de gemini-pro...
✅ gemini-pro - Disponible
⏳ Test de gemini-pro-vision...
✅ gemini-pro-vision - Disponible
⏳ Test de gemini-1.5-pro...
❌ gemini-1.5-pro - Erreur: Model not found
...

============================================================
📊 RÉSULTATS:
============================================================

✅ MODÈLES DISPONIBLES:
   • gemini-pro
     Status: ✅ Disponible
     Test: Bonjour ! Je suis là pour vous aider...

   • gemini-pro-vision
     Status: ✅ Disponible
     Test: Bonjour ! Comment puis-je vous aider...

❌ MODÈLES NON DISPONIBLES:
   • gemini-1.5-pro - ❌ Erreur
     Erreur: Model not found

============================================================
📈 Résumé: 2 modèles disponibles sur 6 testés

💡 RECOMMANDATION:
   Utilisez 'gemini-pro' pour le texte général
   Utilisez 'gemini-pro-vision' pour les images
```

## 🔧 Dépannage

### ❌ Erreur "API_KEY_INVALID"
**Problème** : Clé API invalide ou manquante

**Solutions** :
1. ✅ Vérifiez que votre clé API est correcte
2. ✅ Assurez-vous qu'elle est bien définie dans le fichier `.env`
3. ✅ Obtenez une nouvelle clé sur: https://makersuite.google.com/app/apikey
4. ✅ Redémarrez votre serveur après modification du `.env`

### ❌ Erreur "Model not found"
**Problème** : Le modèle n'est pas disponible dans votre région

**Solutions** :
1. ✅ Essayez un autre modèle de la liste
2. ✅ Vérifiez la disponibilité régionale sur [Google AI Studio](https://makersuite.google.com/)
3. ✅ Utilisez `gemini-pro` qui est généralement disponible partout

### ❌ Erreur de connexion
**Problème** : Problème de réseau ou de connectivité

**Solutions** :
1. ✅ Vérifiez votre connexion internet
2. ✅ Vérifiez que l'API Gemini est accessible depuis votre région
3. ✅ Essayez avec un VPN si nécessaire
4. ✅ Vérifiez les pare-feu d'entreprise

### ❌ Erreur "Rate limit exceeded"
**Problème** : Trop de requêtes envoyées

**Solutions** :
1. ✅ Attendez quelques minutes avant de réessayer
2. ✅ Vérifiez les limites de votre compte Google AI Studio
3. ✅ Utilisez un compte payant pour des limites plus élevées

## 🛠️ Scripts personnalisés

### Tester avec un contenu spécifique
```bash
# Modifier le script pour tester avec votre contenu
node --loader ts-node/esm scripts/list-gemini-models.ts
```

### Ajouter de nouveaux modèles
Modifiez le tableau `modelsToTest` dans le script :
```typescript
const modelsToTest: string[] = [
  'gemini-pro',
  'gemini-pro-vision',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'votre-nouveau-modele' // Ajoutez ici
];
```

## 📈 Performance

| Modèle | Vitesse | Qualité | Recommandation |
|--------|---------|---------|----------------|
| `gemini-1.5-flash` | ⚡⚡⚡ | ⭐⭐⭐ | Tests rapides |
| `gemini-pro` | ⚡⚡ | ⭐⭐⭐⭐ | Usage général |
| `gemini-1.5-pro` | ⚡ | ⭐⭐⭐⭐⭐ | Qualité maximale |

## 🤝 Contribution

Pour améliorer ces scripts :
1. Fork le projet
2. Créer une branche feature
3. Ajouter vos améliorations
4. Tester avec différents modèles
5. Soumettre une Pull Request

---

<div align="center">
  <p>🔍 <strong>Diagnostic Gemini</strong> - Testez vos modèles IA</p>
  <p>Fait avec ❤️ pour Archivus</p>
</div>
