// app/users/page.tsx (ou pages/users.tsx para Pages Router)
'use client'; // Necessário para componentes interativos no App Router

import { useState, useEffect } from 'react';
import { User } from '@/interfaces/User'; // Importe a interface que criamos

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchBy, setSearchBy] = useState<'id' | 'email' | 'cpf'>('email');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = '/api/users';
        // Se houver termo de busca, adiciona aos parâmetros da URL
        if (searchTerm) {
          url += `?${searchBy}=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao carregar usuários.');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchTerm, searchBy]); // Refaz a busca quando searchTerm ou searchBy mudam

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(e.target.value as 'id' | 'email' | 'cpf');
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Carregando Cadastrados...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', color: 'red' }}>
        <h1>Erro ao Carregar Cadastrados</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lista de Usuários Cadastrados</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder={`Buscar por ${searchBy}...`}
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '8px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <select
          value={searchBy}
          onChange={handleSearchByChange}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="email">Email</option>
          <option value="cpf">CPF</option>
          <option value="id">ID</option>
        </select>
      </div>

      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Nome Completo</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>CPF</th>
              <th style={tableHeaderStyle}>Celular</th>
              <th style={tableHeaderStyle}>Instituição</th>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tableCellStyle}>{user.id}</td>
                <td style={tableCellStyle}>{user.name} {user.last_name}</td>
                <td style={tableCellStyle}>{user.email}</td>
                <td style={tableCellStyle}>{user.cpf}</td>
                <td style={tableCellStyle}>{user.cellphone || 'N/A'}</td>
                <td style={tableCellStyle}>{user.institution || 'N/A'}</td>
                {/* Renderize mais dados aqui */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};