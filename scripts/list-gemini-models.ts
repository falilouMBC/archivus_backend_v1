import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Erreur: GEMINI_API_KEY n'est pas définie dans les variables d'environnement.");
  console.log("💡 Créez un fichier .env avec: GEMINI_API_KEY=your_api_key_here");
  process.exit(1);
}

interface ModelResult {
  name: string;
  status: string;
  testResponse?: string;
  error?: string;
}

async function listAvailableModels(): Promise<void> {
  try {
    console.log("🔍 Recherche des modèles Gemini disponibles dans votre région...\n");
    
    const genAI = new GoogleGenerativeAI(API_KEY!);
    
    // Liste des modèles à tester
    const modelsToTest: string[] = [
      'gemini-pro',
      'gemini-pro-vision',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.0-pro',
      'gemini-1.0-pro-vision'
    ];
    
    const availableModels: ModelResult[] = [];
    const unavailableModels: ModelResult[] = [];
    
    console.log("📋 Test des modèles:\n");
    
    for (const modelName of modelsToTest) {
      try {
        console.log(`⏳ Test de ${modelName}...`);
        
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Test simple avec un prompt court
        const testPrompt = "Bonjour";
        const result = await model.generateContent(testPrompt);
        const response = await result.response;
        const text = response.text();
        
        if (text && text.length > 0) {
          availableModels.push({
            name: modelName,
            status: '✅ Disponible',
            testResponse: text.substring(0, 50) + (text.length > 50 ? '...' : '')
          });
          console.log(`✅ ${modelName} - Disponible`);
        } else {
          unavailableModels.push({
            name: modelName,
            status: '❌ Pas de réponse'
          });
          console.log(`❌ ${modelName} - Pas de réponse`);
        }
        
      } catch (error: any) {
        unavailableModels.push({
          name: modelName,
          status: '❌ Erreur',
          error: error.message
        });
        console.log(`❌ ${modelName} - Erreur: ${error.message}`);
      }
      
      // Petite pause entre les tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log("\n" + "=".repeat(60));
    console.log("📊 RÉSULTATS:");
    console.log("=".repeat(60));
    
    if (availableModels.length > 0) {
      console.log("\n✅ MODÈLES DISPONIBLES:");
      availableModels.forEach(model => {
        console.log(`   • ${model.name}`);
        console.log(`     Status: ${model.status}`);
        console.log(`     Test: ${model.testResponse}`);
        console.log("");
      });
    }
    
    if (unavailableModels.length > 0) {
      console.log("\n❌ MODÈLES NON DISPONIBLES:");
      unavailableModels.forEach(model => {
        console.log(`   • ${model.name} - ${model.status}`);
        if (model.error) {
          console.log(`     Erreur: ${model.error}`);
        }
        console.log("");
      });
    }
    
    console.log("=".repeat(60));
    console.log(`📈 Résumé: ${availableModels.length} modèles disponibles sur ${modelsToTest.length} testés`);
    
    if (availableModels.length > 0) {
      console.log("\n💡 RECOMMANDATION:");
      console.log("   Utilisez 'gemini-pro' pour le texte général");
      console.log("   Utilisez 'gemini-pro-vision' pour les images");
    }
    
  } catch (error: any) {
    console.error("❌ Erreur lors de la vérification des modèles:", error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log("\n💡 SOLUTION:");
      console.log("   1. Vérifiez que votre clé API est correcte");
      console.log("   2. Assurez-vous qu'elle est bien définie dans le fichier .env");
      console.log("   3. Obtenez une nouvelle clé sur: https://makersuite.google.com/app/apikey");
    }
  }
}

// Fonction pour tester un modèle spécifique
async function testSpecificModel(modelName: string): Promise<void> {
  try {
    console.log(`🧪 Test détaillé du modèle: ${modelName}\n`);
    
    const genAI = new GoogleGenerativeAI(API_KEY!);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const testPrompts: string[] = [
      "Bonjour, comment allez-vous?",
      "Expliquez-moi l'intelligence artificielle en 2 phrases.",
      "Génère 3 tags pour: 'Machine Learning, Deep Learning, Neural Networks'"
    ];
    
    for (let i = 0; i < testPrompts.length; i++) {
      const prompt = testPrompts[i];
      console.log(`📝 Test ${i + 1}: ${prompt}`);
      
      const result = await model.generateContent(prompt!);
      const response = await result.response;
      const text = response.text();
      
      console.log(`📤 Réponse: ${text}`);
      console.log("-".repeat(50));
    }
    
  } catch (error: any) {
    console.error(`❌ Erreur lors du test de ${modelName}:`, error.message);
  }
}

// Exécution principale
async function main(): Promise<void> {
  console.log("🚀 Script de vérification des modèles Gemini");
  console.log("=".repeat(50));
  
  // Vérifier les arguments de ligne de commande
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Tester un modèle spécifique
    await testSpecificModel(args[0]!);
  } else {
    // Lister tous les modèles disponibles
    await listAvailableModels();
  }
}

main().catch(console.error);
