
import React, { useState, useEffect } from 'react';
import { 
  Search, Menu, X, Users, PieChart, 
  Bell, User, Filter, Plus,
  Edit, Trash2, Power, ArrowUp, ArrowDown
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import '../styles/AdminDashboard.css'; // Assuming you have a CSS file for styles
// Mock data
import Register from './Register';
const mockUsers = [
  { id: 1, name: 'Agent Smith', email: 'smith@matrix.ai', status: 'active', role: 'Admin', lastActive: '2 mins ago' },
  { id: 2, name: 'Agent Johnson', email: 'johnson@matrix.ai', status: 'active', role: 'Support', lastActive: '15 mins ago' },
  { id: 3, name: 'Agent Brown', email: 'brown@matrix.ai', status: 'inactive', role: 'Sales', lastActive: '3 days ago' },
  { id: 4, name: 'Agent Jackson', email: 'jackson@matrix.ai', status: 'active', role: 'Technical', lastActive: '45 mins ago' },
  { id: 5, name: 'Agent Thompson', email: 'thompson@matrix.ai', status: 'pending', role: 'Manager', lastActive: '1 hour ago' },
  { id: 6, name: 'Agent Davis', email: 'davis@matrix.ai', status: 'active', role: 'Support', lastActive: '5 mins ago' },
  { id: 7, name: 'Agent White', email: 'white@matrix.ai', status: 'active', role: 'Technical', lastActive: '12 mins ago' },
  { id: 8, name: 'Agent Moore', email: 'moore@matrix.ai', status: 'inactive', role: 'Sales', lastActive: '1 week ago' },
];

const queryTimeData = [
  { name: 'Jan', queries: 4000 },
  { name: 'Feb', queries: 3000 },
  { name: 'Mar', queries: 5000 },
  { name: 'Apr', queries: 7000 },
  { name: 'May', queries: 6000 },
  { name: 'Jun', queries: 8000 },
  { name: 'Jul', queries: 9000 },
];

const queryTypeData = [
  { name: 'Information', value: 400 },
  { name: 'Technical', value: 300 },
  { name: 'Support', value: 300 },
  { name: 'Sales', value: 200 },
  { name: 'Other', value: 100 },
];

const responseRateData = [
  { name: 'Success', value: 85 },
  { name: 'Failure', value: 15 },
];

const translationData = [
  { name: 'Mon', translations: 12 },
  { name: 'Tue', translations: 19 },
  { name: 'Wed', translations: 25 },
  { name: 'Thu', translations: 18 },
  { name: 'Fri', translations: 22 },
  { name: 'Sat', translations: 8 },
  { name: 'Sun', translations: 5 },
];

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('user-management');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    let results = mockUsers;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      results = results.filter(user => user.status === filterStatus);
    }
    
    // Apply sorting
    results = [...results].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredUsers(results);
  }, [searchTerm, filterStatus, sortField, sortDirection]);

  const handleNavItemClick = (tab) => {
    setActiveTab(tab);
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
  };

  const toggleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isUserDropdownOpen) setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className={`logo ${sidebarOpen ? 'visible' : 'hidden'}`}>
            Travis
          </div>
          <button onClick={toggleSidebar} className="sidebar-toggle">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="sidebar-nav">
          <nav>
            <button 
              onClick={() => handleNavItemClick('user-management')}
              className={`nav-item ${activeTab === 'user-management' ? 'active' : ''}`}
            >
              <Users size={20} />
              <span className={`nav-text ${sidebarOpen ? 'visible' : 'hidden'}`}>
                User Management
              </span>
            </button>
            <button 
              onClick={() => handleNavItemClick('query-analytics')}
              className={`nav-item ${activeTab === 'query-analytics' ? 'active' : ''}`}
            >
              <PieChart size={20} />
              <span className={`nav-text ${sidebarOpen ? 'visible' : 'hidden'}`}>
                Query Analytics
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="top-header">
          <div className="header-content">
            <h1 className="page-title">{activeTab === 'user-management' ? 'User Management' : 'Query Analytics'}</h1>
            <div className="user-section">
              <div className="notification-container">
                <button 
                  className="notification-btn"
                  onClick={toggleNotification}
                >
                  <Bell size={20} />
                  <span className="notification-badge">3</span>
                </button>
                {isNotificationOpen && (
                  <div className="notification-dropdown">
                    <h3 className="dropdown-title">Notifications</h3>
                    <div className="notification-item">
                      <span className="notification-dot new"></span>
                      <div className="notification-content">
                        <p className="notification-text">New agent registered</p>
                        <span className="notification-time">5 mins ago</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <span className="notification-dot new"></span>
                      <div className="notification-content">
                        <p className="notification-text">System update available</p>
                        <span className="notification-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <span className="notification-dot"></span>
                      <div className="notification-content">
                        <p className="notification-text">Weekly report ready</p>
                        <span className="notification-time">2 days ago</span>
                      </div>
                    </div>
                    <button className="view-all-btn">View all notifications</button>
                  </div>
                )}
              </div>
              <div className="user-profile-container">
                <button
                  className="user-profile-btn"
                  onClick={toggleUserDropdown}
                >
                  <div className="avatar">
                    <User size={20} />
                  </div>
                  <div className="user-info">
                    <div className="user-name">Admin User</div>
                    <div className="user-email">admin@travis.ai</div>
                  </div>
                </button>
                {isUserDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-item">
                      <User size={16} />
                      <span>Profile</span>
                    </div>
                    <div className="dropdown-item">
                      <PieChart size={16} />
                      <span>Dashboard</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item logout-item"
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}>
                      <Power size={16} />
                      <a href="/login" > <span>Logout </span></a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="content-area">
          {activeTab === 'user-management' && (
            <div className="user-management-section">
              <div className="card">
                <div className="card-controls">
                  <div className="search-container">
                    <Search size={20} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search agents..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="filter-controls" href="/register">
                    <div className="filter-dropdown">
                      <Filter size={16} className="filter-icon" />
                      <select 
                        className="status-filter"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <button className="add-agent-btn" >
                      <Plus size={16} />
                      <span>Add User</span>
                    </button>
                  </div>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="sortable-header" onClick={() => toggleSort('name')}>
                          <div className="header-content">
                            Name
                            {sortField === 'name' && (
                              sortDirection === 'asc' ? <ArrowUp size={14} className="sort-icon" /> : <ArrowDown size={14} className="sort-icon" />
                            )}
                          </div>
                        </th>
                        <th className="sortable-header" onClick={() => toggleSort('email')}>
                          <div className="header-content">
                            Email
                            {sortField === 'email' && (
                              sortDirection === 'asc' ? <ArrowUp size={14} className="sort-icon" /> : <ArrowDown size={14} className="sort-icon" />
                            )}
                          </div>
                        </th>
                        <th className="sortable-header" onClick={() => toggleSort('role')}>
                          <div className="header-content">
                            Role
                            {sortField === 'role' && (
                              sortDirection === 'asc' ? <ArrowUp size={14} className="sort-icon" /> : <ArrowDown size={14} className="sort-icon" />
                            )}
                          </div>
                        </th>
                        <th className="sortable-header" onClick={() => toggleSort('status')}>
                          <div className="header-content">
                            Status
                            {sortField === 'status' && (
                              sortDirection === 'asc' ? <ArrowUp size={14} className="sort-icon" /> : <ArrowDown size={14} className="sort-icon" />
                            )}
                          </div>
                        </th>
                        <th className="sortable-header" onClick={() => toggleSort('lastActive')}>
                          <div className="header-content">
                            Last Active
                            {sortField === 'lastActive' && (
                              sortDirection === 'asc' ? <ArrowUp size={14} className="sort-icon" /> : <ArrowDown size={14} className="sort-icon" />
                            )}
                          </div>
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="data-row">
                          <td className="user-name-cell">{user.name}</td>
                          <td className="user-email-cell">{user.email}</td>
                          <td className="user-role-cell">{user.role}</td>
                          <td className="user-status-cell">
                            <span className={`status-badge ${user.status}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="last-active-cell">{user.lastActive}</td>
                          <td className="actions-cell">
                            <div className="action-buttons">
                              {/* <button className="edit-btn" title="Edit agent">
                                <Edit size={16} />
                              </button> */}
                              <button className="delete-btn" title="Delete agent">
                                <Trash2 size={16} />
                              </button>
                              <button className="power-btn" title="Toggle status">
                                <Power size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="no-results">
                    <p>No agents found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'query-analytics' && (
            <div className="analytics-grid">
              <div className="card">
                <h2 className="chart-title">Queries Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={queryTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="queryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="queries" 
                      stroke="#0ea5e9" 
                      fillOpacity={1}
                      fill="url(#queryGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h2 className="chart-title">Query Types Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={queryTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {queryTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h2 className="chart-title">Response Success Rate</h2>
                <div className="pie-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie>
                      <Pie
                        data={responseRateData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        <Cell key="cell-0" fill="#10b981" />
                        <Cell key="cell-1" fill="#f87171" />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card">
                <h2 className="chart-title">Translations Used</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={translationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="translations" 
                      radius={[4, 4, 0, 0]}
                    >
                      {translationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % 2]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );  }

  export default AdminDashboard;