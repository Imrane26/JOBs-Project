import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const userData = (() => { try { return JSON.parse(sessionStorage.getItem('userData') || '{}') || {}; } catch { return {}; } })();
  const name = [userData.prenom, userData.nom].filter(Boolean).join(' ') || 'Mon espace';
  const initial = name.charAt(0).toUpperCase();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/emploi${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`);
  };

  const handleLogout = () => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loginData');
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <HeaderShell>
      <HeaderBar>
        <LogoLink to="/home"><img src="/logo-no-background-green.png" alt="JOB’S" /></LogoLink>
        <SearchForm onSubmit={handleSearch}><i className="fas fa-search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un emploi" aria-label="Rechercher un emploi" /></SearchForm>
        <Navigation>
          <NavItem to="/home" $active={location.pathname === '/home'}><i className="fas fa-home" /><span>Accueil</span></NavItem>
          <NavItem to="/emploi" $active={location.pathname === '/emploi'}><i className="fas fa-briefcase" /><span>Opportunités</span></NavItem>
          <NavButton type="button"><i className="fas fa-bell" /><span>Notifications</span></NavButton>
          <UserArea>
            <UserButton type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}><Avatar>{initial}</Avatar><span>{name.split(' ')[0]}</span><i className="fas fa-chevron-down" /></UserButton>
            {menuOpen && <UserMenu><Link to="/profile-utilisateur" onClick={() => setMenuOpen(false)}>Mon profil</Link><button type="button" onClick={handleLogout}>Déconnexion</button></UserMenu>}
          </UserArea>
        </Navigation>
      </HeaderBar>
    </HeaderShell>
  );
}

const HeaderShell = styled.header`position: fixed; inset: 0 0 auto; z-index: 100; padding: 0 24px; background: #fff; border-bottom: 1px solid #d8ded8; @media (max-width: 760px) { padding: 0 10px; }`;
const HeaderBar = styled.div`height: 72px; max-width: 1180px; margin: 0 auto; display: flex; align-items: center; gap: 30px; padding: 0; background: transparent; @media (max-width: 760px) { height: 58px; gap: 8px; }`;
const LogoLink = styled(Link)`display: flex; align-items: center; flex: 0 0 auto; padding-right: 18px; border-right: 2px solid var(--jobs-green); img { display: block; width: 92px; max-height: 38px; object-fit: contain; } @media (max-width: 760px) { padding-right: 10px; img { width: 78px; } }`;
const SearchForm = styled.form`position: relative; flex: 1; max-width: 300px; i { position: absolute; left: 0; top: 50%; transform: translateY(-50%); color: var(--jobs-green-dark); font-size: .78rem; } input { width: 100%; height: 34px; box-sizing: border-box; padding: 0 8px 0 24px; border: 0; border-bottom: 1px solid var(--jobs-accent-gray); border-radius: 0; outline: 0; background: transparent; color: var(--jobs-text); font-size: .84rem; } input:focus { border-bottom-color: var(--jobs-green); box-shadow: none; } @media (max-width: 760px) { max-width: none; input { height: 31px; font-size: .75rem; } } @media (max-width: 520px) { max-width: 135px; }`;
const Navigation = styled.nav`display: flex; align-items: center; gap: 18px; margin-left: auto;`;
const NavItem = styled(Link)`position: relative; display: inline-flex; align-items: center; gap: 7px; padding: 26px 0 22px; color: ${({ $active }) => $active ? 'var(--jobs-green-dark)' : 'var(--jobs-muted)'}; font-size: .8rem; font-weight: ${({ $active }) => $active ? 800 : 600}; white-space: nowrap; i { font-size: .78rem; } &::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: ${({ $active }) => $active ? 'var(--jobs-green)' : 'transparent'}; } &:hover { color: var(--jobs-green-dark); } @media (max-width: 760px) { padding: 20px 5px 18px; span { display: none; } }`;
const NavButton = styled.button`display: inline-flex; align-items: center; gap: 7px; padding: 26px 0 22px; border: 0; background: transparent; color: var(--jobs-muted); font-size: .8rem; font-weight: 600; cursor: pointer; white-space: nowrap; &:hover { color: var(--jobs-green-dark); } @media (max-width: 760px) { padding: 20px 5px 18px; span { display: none; } }`;
const UserArea = styled.div`position: relative; margin-left: 4px; padding-left: 16px; border-left: 1px solid var(--jobs-accent-gray);`;
const UserButton = styled.button`display: flex; align-items: center; gap: 7px; border: 0; padding: 5px 0; background: transparent; color: var(--jobs-text); font-size: .8rem; font-weight: 700; cursor: pointer; &:hover { color: var(--jobs-green-dark); } .fa-chevron-down { color: var(--jobs-muted); font-size: .6rem; } @media (max-width: 760px) { span:not(:first-child) { display: none; } }`;
const Avatar = styled.span`width: 27px; height: 27px; display: grid; place-items: center; border-radius: 5px; background: var(--jobs-green); color: #fff; font-size: .75rem; font-weight: 800;`;
const UserMenu = styled.div`position: absolute; right: 0; top: 48px; min-width: 145px; padding: 6px; border: 1px solid var(--jobs-border); border-radius: 11px; background: #fff; box-shadow: 0 12px 24px rgba(36, 51, 43, .12); a, button { display: block; width: 100%; box-sizing: border-box; padding: 9px 10px; border: 0; border-radius: 7px; background: transparent; color: var(--jobs-text); text-align: left; font-size: .8rem; text-decoration: none; cursor: pointer; } a:hover, button:hover { background: var(--jobs-green-soft); color: var(--jobs-green-dark); }`;

