import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig';
import Itemcard from '../components/Itemcard';

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error('Failed to fetch item', err);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <p>Loading item...</p>;

   return (
    <div className="single-item-page body">
        <Itemcard item={item} />
      </div>
  );
};

export default ItemPage;
