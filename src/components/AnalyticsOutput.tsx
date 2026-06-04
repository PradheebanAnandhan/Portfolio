import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AnalyticsSummary {
  total_views: number;
  unique_visitors: number;
  countries_reached: number;
  last_visit: string;
}

interface TopCountry {
  country: string;
  visits: number;
}

export const AnalyticsOutput: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [topCountries, setTopCountries] = useState<TopCountry[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Fetch summary
        const { data: summaryData, error: summaryError } = await supabase
          .from('analytics_summary')
          .select('*')
          .limit(1)
          .single();

        if (summaryError) throw summaryError;
        
        // Fetch top countries
        const { data: countriesData, error: countriesError } = await supabase
          .from('top_countries')
          .select('*');

        if (countriesError) throw countriesError;

        setSummary(summaryData);
        setTopCountries(countriesData || []);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError("Error: Connection to telemetry server timed out or was refused. Verify the SQL views are created in Supabase.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="font-mono text-sm max-w-lg border border-yellow-500/50 bg-black/40 p-4 shadow-[0_0_10px_rgba(234,179,8,0.1)] mt-2">
        <div className="text-yellow-400 font-bold mb-3 text-center tracking-widest border-b border-yellow-500/50 pb-2">
          SYSTEM ANALYTICS & TELEMETRY
        </div>
        <div className="space-y-1 text-gray-300">
          <div>Status: <span className="text-yellow-400 animate-pulse font-bold">LOADING 🟡</span></div>
          <div className="mt-2 text-xs">Establishing secure connection...</div>
          <div className="text-xs text-gray-400">{'Fetching telemetry [=================>  ] 80%'}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-mono text-sm max-w-lg border border-red-500/50 bg-black/40 p-4 shadow-[0_0_10px_rgba(239,68,68,0.1)] mt-2">
        <div className="text-red-400 font-bold mb-3 text-center tracking-widest border-b border-red-500/50 pb-2">
          SYSTEM ANALYTICS & TELEMETRY
        </div>
        <div className="space-y-1 text-gray-300">
          <div>Status: <span className="text-red-500 font-bold">OFFLINE 🔴</span></div>
          <div className="mt-2 text-xs text-red-400/80">{error}</div>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const seconds = pad(d.getSeconds());
    
    let tz: string;
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(d);
      tz = parts.find(p => p.type === 'timeZoneName')?.value || 'UTC';
    } catch {
      tz = 'UTC';
    }

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${tz}`;
  };

  return (
    <div className="font-mono text-sm max-w-lg border border-[#50fa7b]/50 bg-black/40 shadow-[0_0_15px_rgba(80,250,123,0.1)] rounded-sm overflow-hidden mt-2">
      <div className="text-[#50fa7b] font-bold py-2 text-center tracking-widest bg-[#50fa7b]/10 border-b border-[#50fa7b]/50">
        SYSTEM ANALYTICS & TELEMETRY
      </div>
      
      <div className="p-4 space-y-4">
        {/* Status Section */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-semibold">Status:</span>
            <span className="font-bold text-[#50fa7b] tracking-wide animate-pulse">ONLINE 🟢</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-semibold">Last Sync:</span>
            <span className="text-[#8be9fd] text-xs">{formatDate(summary.last_visit)}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-600"></div>

        {/* Global Metrics Section */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Portfolio Views:</span>
            <span className="font-bold text-[#ff79c6]">{summary.total_views || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Unique Visitors:</span>
            <span className="font-bold text-[#ffb86c]">{summary.unique_visitors || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Countries Reached:</span>
            <span className="font-bold text-[#f1fa8c]">{summary.countries_reached || 0}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-600"></div>
        
        {/* Top Origin Nodes Section */}
        <div className="space-y-2">
          <div className="text-[#50fa7b] font-semibold underline decoration-dashed underline-offset-4 mb-2">
            Top Origin Nodes
          </div>
          {topCountries.length === 0 ? (
            <div className="text-gray-500 italic text-xs">No geodata acquired yet.</div>
          ) : (
            <ul className="space-y-1.5 pl-2">
              {topCountries.map((tc, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">
                    <span className="text-gray-500 mr-2">{idx + 1}.</span> 
                    {tc.country}
                  </span>
                  <span className="text-[#8be9fd] font-bold">{tc.visits}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
