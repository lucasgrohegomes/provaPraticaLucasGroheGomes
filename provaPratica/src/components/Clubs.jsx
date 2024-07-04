import React, { useState, useEffect } from 'react';

const Clubs = () => {
  const [nome, setNome] = useState('');
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClube();
  }, []);

  const fetchClube = () => {
    setLoading(true);
    fetch('https://api.cartola.globo.com/clubes')
      .then(response => response.json())
      .then(data => {
        setClubes(Object.values(data));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div className="search-container">
      <form onSubmit={(e) => e.preventDefault()} className="search">
        <input
          type="text"
          className="campo"
          value={nome}
          placeholder="Digite um Clube"
          onChange={(e) => setNome(e.target.value.toLowerCase())}
        />
      </form>
      <div className="galeria">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {clubes
          .filter(clube => 
            clube.nome.toLowerCase().includes(nome) || 
            clube.apelido.toLowerCase().includes(nome))
          .map(clube => (
            <div key={clube.id} className="clube">
              <img className="escudos-img" src={clube.escudos['60x60']} alt={clube.nome} />
              <div className="info">
                <h3 className="nome">{clube.nome}</h3>
                <h3 className="apelido">({clube.apelido})</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Clubs;
