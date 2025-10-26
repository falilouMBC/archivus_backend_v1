# Scripts de vérification des modèles Gemini

Ce dossier contient des scripts pour tester et vérifier les modèles Gemini disponibles dans votre région.

## 📁 Fichiers

- `list-gemini-models.ts` - Version TypeScript du script
- `list-gemini-models.js` - Version JavaScript du script

## 🚀 Utilisation

### 1. Lister tous les modèles disponibles

```bash
# Version TypeScript (recommandée)
npm run list-models

# Version JavaScript
npm run list-models-js
```

### 2. Tester un modèle spécifique

```bash
# Tester gemini-pro
npm run test-model gemini-pro

# Tester gemini-pro-vision
npm run test-model gemini-pro-vision
```

## 📋 Modèles testés

Le script teste automatiquement ces modèles :

- `gemini-pro` - Modèle général pour le texte
- `gemini-pro-vision` - Modèle pour les images
- `gemini-1.5-pro` - Version 1.5 Pro
- `gemini-1.5-flash` - Version 1.5 Flash
- `gemini-1.0-pro` - Version 1.0 Pro
- `gemini-1.0-pro-vision` - Version 1.0 Pro Vision

## ⚙️ Configuration requise

Assurez-vous d'avoir dans votre fichier `.env` :

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

## 📊 Exemple de sortie

```
🚀 Script de vérification des modèles Gemini
==================================================
🔍 Recherche des modèles Gemini disponibles dans votre région...

📋 Test des modèles:

⏳ Test de gemini-pro...
✅ gemini-pro - Disponible
⏳ Test de gemini-pro-vision...
✅ gemini-pro-vision - Disponible
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

============================================================
📈 Résumé: 2 modèles disponibles sur 6 testés

💡 RECOMMANDATION:
   Utilisez 'gemini-pro' pour le texte général
   Utilisez 'gemini-pro-vision' pour les images
```

## 🔧 Dépannage

### Erreur "API_KEY_INVALID"
- Vérifiez que votre clé API est correcte
- Assurez-vous qu'elle est bien définie dans le fichier `.env`
- Obtenez une nouvelle clé sur: https://makersuite.google.com/app/apikey

### Erreur "Model not found"
- Le modèle n'est pas disponible dans votre région
- Essayez un autre modèle de la liste

### Erreur de connexion
- Vérifiez votre connexion internet
- Vérifiez que l'API Gemini est accessible depuis votre région
