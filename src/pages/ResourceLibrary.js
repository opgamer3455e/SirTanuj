import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "page-container", style: { paddingTop: '2rem' }, children: [_jsxs("header", { className: "mb-12", children: [_jsx("h1", { className: "section-title", children: "Resource Library" }), _jsx("p", { className: "section-subtitle", children: "Access your digital manuals, study files, and core notes anywhere, anytime." })] }), _jsx("div", { className: "grid-2", children: resources.map((res) => (_jsxs("div", { className: "card resource-card flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "p-3 bg-glass rounded-lg text-accent", children: _jsx(FileText, { size: 32 }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl m-0", children: res.title }), _jsxs("span", { className: "text-xs text-secondary uppercase tracking-wider", children: [res.type, " \u00B7 ", res.size] })] })] }), _jsx("p", { className: "flex-1 mb-6", children: res.description }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("a", { href: res.url, target: "_blank", rel: "noreferrer", className: "btn btn-primary flex-1 text-center", children: [_jsx(Eye, { size: 16 }), " View"] }), _jsxs("a", { href: res.url, download: true, className: "btn btn-outline flex-1 text-center", children: [_jsx(Download, { size: 16 }), " Download"] })] })] }, res.id))) })] }));
}
