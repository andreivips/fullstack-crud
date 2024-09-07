// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (id) {
      updateUser(id);
    }
  }, [id]);

  const fetchUsers = async (newPage = 1) => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: {
          page: newPage,
          per_page: perPage,
        }
      });
      setPage(response.data.page);
      setPerPage(response.data.per_page);
      setData(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      alert('Error fetching users.')
      console.error('Error fetching users:', error);
    }
  };

  const createUser = () => {
    setCurrentUserId(null);
    setIsModalOpen(true);
    navigate('/create');
  };

  const updateUser = (id) => {
    setCurrentUserId(id);
    setIsModalOpen(true);
    navigate(`/edit/${id}`);
  };

  const onUserSave = (id) => {
    fetchUsers();
    closeModal();
    navigate('/');
  };

  const deleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user ?')) {
      try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        fetchUsers();
        closeModal();
      } catch (error) {
        alert('Error deleting user.')
        console.error('Error deleting user:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const prevPage = () => { fetchUsers(page - 1) }
  const nextPage = () => { fetchUsers(page + 1) }

  return (
    <div className="p-4 flex flex-col items-start align-top justify-start">
      <div className='w-full flex flex-row items-center justify-between content-between'>
        <button
          onClick={() => createUser()}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Create New User
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className='hidden sm:table-header-group'>
          <tr className="bg-gray-200 table-header-text">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Age</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Interests</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data?.map((userData, index) => (
            <tr key={userData._id} className="flex flex-col sm:table-row border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="inline-block sm:hidden table-header-text">Name:&nbsp;</div>
                {userData.name}
              </td>
              <td className="py-3 px-6 text-left">
                <div className="inline-block sm:hidden table-header-text">Age:&nbsp;</div>
                {userData.age}
              </td>
              <td className="py-3 px-6 text-left">
                <div className="inline-block sm:hidden table-header-text">Email:&nbsp;</div>
                {userData.email}
              </td>
              <td className="py-3 px-6 text-left">
                <div className="inline-block sm:hidden table-header-text">Interests:&nbsp;</div>
                {userData.interests}
              </td>
              <td className="py-3 px-6 text-left">
                <div className="inline-block sm:hidden table-header-text">Address:&nbsp;</div>
                {userData.address}
              </td>
              <td className="py-3 px-6 flex items-center justify-center">
                <button
                  onClick={() => updateUser(userData._id)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(userData._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full mt-4 flex flex-row justify-start items-center content-center">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className={clsx(
              "w-24 px-4 py-2 bg-blue-500 text-white rounded hover:active:bg-blue-700 transition duration-300",
              (page === 1)&&"opacity-50"
            )}
          >
            Previous
          </button>
          <div className="text-gray-400 p-2 break-keep">Page {page} of {Math.ceil(total / perPage)}</div>
          <button
            onClick={nextPage}
            disabled={page * perPage >= total}
            className={clsx(
              "w-24 px-4 py-2 bg-blue-500 text-white rounded hover:active:bg-blue-700 transition duration-300",
              (page * perPage >= total)&&"opacity-50"
            )}
          >
            Next
          </button>

      </div>

      <div className='w-full text-center mt-4 px-4 py-2 border border-gray-200 rounded-lg'>
        Total: {total} users
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserForm userId={currentUserId} onSave={onUserSave}/>
      </Modal>

    </div>
  );
}
