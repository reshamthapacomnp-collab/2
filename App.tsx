
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import { GeneratedAsset } from './types';
import { generateWebsiteDraft, generateHeroImage } from './services/geminiService';

const App: React.FC = () => {
  const [asset, setAsset] = useState<GeneratedAsset>({
    data: null,
    heroImage: null,
    loading: false,
    error: null
  });

  const handleGenerate = async (prompt: string) => {
    setAsset(prev => ({ ...prev, loading: true, error: null, data: null, heroImage: null }));
    
    try {
      // Step 1: Generate textual content
      const websiteData = await generateWebsiteDraft(prompt);
      setAsset(prev => ({ ...prev, data: websiteData }));

      // Step 2: Generate hero image based on AI-suggested visual prompt
      try {
        const imageUrl = await generateHeroImage(websiteData.imagePrompt);
        setAsset(prev => ({ ...prev, heroImage: imageUrl }));
      } catch (imgError) {
        console.error("Image generation failed:", imgError);
        // We still show the text even if image fails
        setAsset(prev => ({ ...prev, heroImage: 'https://picsum.photos/1200/800' }));
      }
      
    } catch (err: any) {
      setAsset(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message || "An unexpected error occurred during generation." 
      }));
    } finally {
      setAsset(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar onGenerate={handleGenerate} isLoading={asset.loading} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {asset.error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-100 border border-red-200 text-red-700 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold">{asset.error}</span>
          </div>
        )}

        {asset.loading && !asset.data && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-indigo-600">AI</div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Architecting your digital presence...</h3>
            <p className="text-slate-500 max-w-sm">We're writing copy, selecting a color palette, and imagining your brand's future.</p>
            
            <div className="mt-12 flex gap-4">
               <div className="h-2 w-12 bg-indigo-200 rounded-full animate-pulse"></div>
               <div className="h-2 w-12 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
               <div className="h-2 w-12 bg-indigo-600 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        )}

        <Preview data={asset.data} image={asset.heroImage} />
        
        {/* Floating Actions for Export / Settings (Visual only) */}
        {asset.data && (
          <div className="absolute bottom-6 right-6 flex gap-3">
             <button className="glass-morphism px-6 py-3 rounded-xl font-bold text-slate-700 shadow-lg hover:bg-white transition-all">
                Export Code
             </button>
             <button className="bg-slate-900 px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:bg-black transition-all">
                Publish Site
             </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
