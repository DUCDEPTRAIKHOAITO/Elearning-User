// src/pages/SearchResultPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CourseTypeFive from '../components/course/CourseTypeFive';

const SearchResultPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const { search } = useLocation();

    const query = new URLSearchParams(search).get('query');

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:8080/api/courses/search?keyword=${query}`)
                .then(res => {
                    setResults(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [query]);

    return (
        <div className="container py-5">
            <h2>Search results for: <em>{query}</em></h2>
            {loading ? (
                <p>Loading...</p>
            ) : results.length > 0 ? (
                <div className="row">
                    {results.map(course => (
                        <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
                            <CourseTypeFive data={course} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No courses found.</p>
            )}
        </div>
    );
};

export default SearchResultPage;
