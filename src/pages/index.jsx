import Layout from "./Layout.jsx";

import Drive from "./Drive";

import FileViewer from "./FileViewer";

import Trash from "./Trash";

import Dashboard from "./Dashboard";

import Wiki from "./Wiki";

import Profile from "./Profile";

import AssistantSettings from "./AssistantSettings";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Drive: Drive,
    
    FileViewer: FileViewer,
    
    Trash: Trash,
    
    Dashboard: Dashboard,
    
    Wiki: Wiki,
    
    Profile: Profile,
    
    AssistantSettings: AssistantSettings,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Drive />} />
                
                
                <Route path="/Drive" element={<Drive />} />
                
                <Route path="/FileViewer" element={<FileViewer />} />
                
                <Route path="/Trash" element={<Trash />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Wiki" element={<Wiki />} />
                
                <Route path="/Profile" element={<Profile />} />
                
                <Route path="/AssistantSettings" element={<AssistantSettings />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}