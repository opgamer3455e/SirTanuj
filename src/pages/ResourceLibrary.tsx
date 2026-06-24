import { FileText, Download, Eye } from 'lucide-react';

export default function ResourceLibrary() {
  const resources = [
    {
      id: 1,
      title: "Physics Lab Manual Class 10",
      description: "Complete practicals, observations, and viva questions for the ICSE Physics syllabus.",
      type: "PDF",
      size: "23 MB",
      url: "/assets/Physics Lab Manual Class 10.pdf"
    },
    {
      id: 2,
      title: "Main Study File Class 10",
      description: "Core notes and important concepts compiled for quick revision.",
      type: "PDF",
      size: "3.3 MB",
      url: "/assets/Main File CLass 10-1.pdf"
    }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '2rem' }}>
      <header className="mb-12">
        <h1 className="section-title">Resource Library</h1>
        <p className="section-subtitle">Access your digital manuals, study files, and core notes anywhere, anytime.</p>
      </header>

      <div className="grid-2">
        {resources.map((res) => (
          <div key={res.id} className="card resource-card flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-glass rounded-lg text-accent">
                <FileText size={32} />
              </div>
              <div>
                <h3 className="text-xl m-0">{res.title}</h3>
                <span className="text-xs text-secondary uppercase tracking-wider">{res.type} · {res.size}</span>
              </div>
            </div>
            
            <p className="flex-1 mb-6">{res.description}</p>
            
            <div className="flex gap-4">
              <a href={res.url} target="_blank" rel="noreferrer" className="btn btn-primary flex-1 text-center">
                <Eye size={16} /> View
              </a>
              <a href={res.url} download className="btn btn-outline flex-1 text-center">
                <Download size={16} /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
