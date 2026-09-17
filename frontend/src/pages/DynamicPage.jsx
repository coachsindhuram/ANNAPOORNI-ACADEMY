import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import api from '../services/api';
import PageRenderer from '../components/cms/PageRenderer';
import { Skeleton } from '../components/Skeleton';
import NotFound from './public/NotFound';

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
      <main className="flex-grow pt-8 px-4 container mx-auto">
        <Skeleton height="400px" className="mb-8" />
        <Skeleton height="200px" />
      </main>
    );
  }

  if (error === 404) {
    return <NotFound />;
  }

  if (error) {
    return (
      <main className="flex-grow flex items-center justify-center pt-8">
        <p className="text-red-500">Failed to load page content.</p>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      <PageRenderer page={page} />
    </main>
  );
};

export default DynamicPage;
