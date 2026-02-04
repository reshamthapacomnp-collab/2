
import React from 'react';
import { WebsiteData } from '../types';

interface PreviewProps {
  data: WebsiteData | null;
  image: string | null;
}

const Preview: React.FC<PreviewProps> = ({ data, image }) => {
  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Ready to Build?</h2>
          <p className="text-slate-500">
            Enter your business description in the sidebar and watch your website come to life in seconds.
          </p>
        </div>
      </div>
    );
  }

  const { businessName, tagline, heroText, aboutUs, sections, colorPalette } = data;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
      {/* Mini Browser Bar */}
      <div className="sticky top-0 z-50 bg-slate-100 border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <div className="ml-4 px-3 py-0.5 bg-white border rounded text-[10px] text-slate-500 min-w-[200px]">
            https://www.{businessName.toLowerCase().replace(/\s+/g, '')}.com
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto shadow-sm min-h-screen pb-20">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6">
          <div className="text-xl font-bold" style={{ color: colorPalette.primary }}>
            {businessName}
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-slate-900">About</a>
            <a href="#" className="hover:text-slate-900">Services</a>
            <a href="#" className="hover:text-slate-900">Pricing</a>
            <button className="px-5 py-2 rounded-full text-white shadow-md transition-transform hover:scale-105" style={{ backgroundColor: colorPalette.primary }}>
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-8 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-opacity-10" style={{ color: colorPalette.primary, backgroundColor: colorPalette.primary }}>
              {tagline}
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              {heroText}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {aboutUs}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:brightness-110" style={{ backgroundColor: colorPalette.primary }}>
                Book a Consult
              </button>
              <button className="px-8 py-4 rounded-xl font-bold border-2 transition-all hover:bg-slate-50" style={{ borderColor: colorPalette.primary, color: colorPalette.primary }}>
                Our Mission
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            {image ? (
              <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500 aspect-video md:aspect-square">
                <img src={image} alt="Hero Visual" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-100 animate-pulse aspect-square flex items-center justify-center text-slate-400">
                Generating Visual...
              </div>
            )}
            {/* Decoration */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl -z-10 opacity-20" style={{ backgroundColor: colorPalette.secondary }}></div>
          </div>
        </section>

        {/* Features/Services */}
        <section className="px-8 py-24 bg-slate-50 -mx-8">
          <div className="max-w-4xl mx-auto text-center mb-16 px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Offerings</h2>
            <div className="h-1.5 w-20 rounded-full mx-auto" style={{ backgroundColor: colorPalette.primary }}></div>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {sections.map((section, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: colorPalette.primary }}>
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
                <p className="text-slate-600 text-sm mb-6">{section.description}</p>
                <ul className="space-y-2">
                  {section.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <svg className="w-4 h-4" style={{ color: colorPalette.accent }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-16 text-center border-t mt-20">
          <div className="text-xl font-bold mb-4" style={{ color: colorPalette.primary }}>
            {businessName}
          </div>
          <p className="text-slate-500 text-sm mb-8">© 2024 {businessName}. Built with SiteCraft AI.</p>
          <div className="flex justify-center gap-6">
            <div className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"></div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"></div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Preview;
