import React from 'react';
import { FileText, Download } from 'lucide-react';

const Vault = ({ documents = [] }) => {
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-obsidian/5 shadow-sm">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-8">
        <FileText className="w-5 h-5 text-chartreuse" />
        The Vault
      </h3>
      
      <div className="space-y-4">
        {documents.map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-neutral/50 rounded-2xl hover:bg-neutral transition-colors group">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl border border-obsidian/5">
                <FileText className="w-5 h-5 text-obsidian/60" />
              </div>
              <div>
                <div className="font-bold text-obsidian group-hover:text-chartreuse transition-colors">{doc.name}</div>
                <div className="text-xs text-obsidian/40">{formatDate(doc.created_at)} • {doc.size}</div>
              </div>
            </div>
            {doc.file_url && (
              <a 
                href={doc.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-obsidian hover:text-chartreuse rounded-full transition-all"
              >
                <Download className="w-5 h-5" />
              </a>
            )}
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-sm text-obsidian/40 text-center py-4">No documents available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Vault;

