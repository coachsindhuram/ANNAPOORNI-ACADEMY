import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import api from '../services/api';
import PageRenderer from '../components/cms/PageRenderer';
import { Skeleton } from '../components/Skeleton';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const DynamicPage = ({ isHome = false }) => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        // Here we could have a public endpoint: /api/public/pages/:slug
        // For now, let's assume we have an endpoint that returns the published page by slug.
        // We'll use a hypothetical public endpoint. We'll need to create it on backend.
        const endpoint = isHome ? '/api/public/pages/home' : `/api/public/pages/${slug}`;
        const response = await api.get(endpoint);
        setPage(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(404);
        } else {
          setError(500);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, isHome]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 px-4 container mx-auto">
          <Skeleton height="400px" className="mb-8" />
          <Skeleton height="200px" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error === 404) {
    // Basic 404 page for unmatched slugs
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found.</p>
          <a href="/" className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition">Go Home</a>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-red-500">Failed to load page content.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <PageRenderer page={page} />
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;
