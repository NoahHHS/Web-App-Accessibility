import React, { Component } from 'react';
import { Zoekbalk } from '../reusables/reusables.jsx';
import '../../stylesheets/Admin.css';
import '../../stylesheets/reusables.css';

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserModalOpen: false,
      isResearchModalOpen: false,
      isCompanyAccountModalOpen: false,
      inputData: '',
      researchData: [],
      companyAccountData: [],
      userData: [],
      selectedItem: '',
      filteredResearchData: [],
      filteredCompanyAccountData: [],
      filteredUserData: [],
    };
  }

  componentDidMount() {
    // Simulate fetching data from the database
    const researchDataFromDB = [
      'Research 1',
      'Research 2',
      'Research 3',
      'Research 4',
      'Research 5',
      'Research 6',
    ];

    const companyAccountDataFromDB = [
      'CompanyAccount 1',
      'CompanyAccount 2',
      'CompanyAccount 3',
      'CompanyAccount 4',
      'CompanyAccount 5',
      'CompanyAccount 6',
    ];

    const userDataFromDB = [
      'User 1',
      'User 2',
      'User 3',
      'User 4',
      'User 5',
      'User 6',
    ];

    this.setState({
      researchData: researchDataFromDB,
      companyAccountData: companyAccountDataFromDB,
      userData: userDataFromDB,
      filteredResearchData: researchDataFromDB,
      filteredCompanyAccountData: companyAccountDataFromDB,
      filteredUserData: userDataFromDB,
    });
  }

  openUserModal = () => {
    this.setState({ isUserModalOpen: true });
  };

  openCompanyAccountModal = () => {
    this.setState({ isCompanyAccountModalOpen: true });
  };

  openResearchModal = () => {
    this.setState({ isResearchModalOpen: true });
  };

  closeModal = () => {
    this.setState({
      isUserModalOpen: false,
      isResearchModalOpen: false,
      isCompanyAccountModalOpen: false,
      selectedItem: '',
    });
  };

  handleInputChange = (e) => {
    this.setState({ inputData: e.target.value });
  };

  handleAddButtonClick = () => {
    // Perform any actions you need when the "Opslaan" button is clicked
    console.log('Data added:', this.state.inputData);

    // Close the modal
    this.closeModal();
  };

  handleAccepterenClick = () => {
    // To be implemented
    this.closeModal();
  };

  handleAfwijzenClick = () => {
    // To be implemented
    this.closeModal();
  };

  handleUserItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openUserModal();
  };

  handleCompanyAccountItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openCompanyAccountModal();
  };

  handleResearchItemClick = (item) => {
    this.setState({ selectedItem: item });
    this.openResearchModal();
  };

  handleResearchSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.researchData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredResearchData: filteredData });
  };

  handleCompanyAccountSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.companyAccountData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredCompanyAccountData: filteredData });
  };

  handleUserSearch = (searchTerm) => {
    // Implement your search logic here, e.g., filtering the list
    const filteredData = this.state.userData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state or perform any other action with the filtered data
    this.setState({ filteredUserData: filteredData });
  };

  render() {
    return (
      <div className="mid-section">
        <h1 className="pagetitle">Admin Pagina</h1>

        {/* Research Data */}
        <h2 className="itemtitle">Research Data</h2>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="Search through research data"
            data={this.state.researchData}
            onSearch={this.handleResearchSearch}
          />
        </div>
        <div className="ResearchList-container">
          <ul className="ResearchList">
            {this.state.filteredResearchData.map((research, index) => (
              <li
                key={index}
                className="ResearchList-item"
                onClick={() => this.handleResearchItemClick(research)}
                style={{ cursor: 'pointer' }}
              >
                {research}
              </li>
            ))}
          </ul>
        </div>

        {/* Company Account Data */}
        <h2 className="itemtitle">Company Account Data</h2>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="Search through company account data"
            data={this.state.companyAccountData}
            onSearch={this.handleCompanyAccountSearch}
          />
        </div>
        <div className="CompanyAccountList-container">
          <ul className="CompanyAccountList">
            {this.state.filteredCompanyAccountData.map((companyAccount, index) => (
              <li
                key={index}
                className="CompanyAccountList-item"
                onClick={() => this.handleCompanyAccountItemClick(companyAccount)}
                style={{ cursor: 'pointer' }}
              >
                {companyAccount}
              </li>
            ))}
          </ul>
        </div>

        {/* User Data */}
        <h2 className="itemtitle">User Data</h2>
        <div className="ZoekbalkContainer">
          <Zoekbalk
            placeholder="Search through user data"
            data={this.state.userData}
            onSearch={this.handleUserSearch}
          />
        </div>
        <div className="UserList-container">
          <ul className="UserList">
            {this.state.filteredUserData.map((user, index) => (
              <li
                key={index}
                className="UserList-item"
                onClick={() => this.handleUserItemClick(user)}
                style={{ cursor: 'pointer' }}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>

        {/* Research Modal/Pop-up */}
        {this.state.isResearchModalOpen && (
          <div>
            <div className="modal-overlay"></div>
            <div className="modal-container">
              <span className="sluiten" onClick={this.closeModal}>
                &times;
              </span>
              <h2 className="Otitel">Research Data</h2>
              {/* Add your input fields and details here */}
              <div className="Accepteren-Afwijzen-Container">
                <button
                  className="Accepteren"
                  onClick={this.handleAccepterenClick}
                >
                  Accepteren
                </button>
                <button
                  className="Afwijzen"
                  onClick={this.handleAfwijzenClick}
                >
                  Afwijzen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Company Account Modal/pop-up */}
        {this.state.isCompanyAccountModalOpen && (
          <div>
            <div className="modal-overlay">
              <div className="modal-container">
                <span className="sluiten" onClick={this.closeModal}>
                  &times;
                </span>
                <h2 className="Otitel">Company Account Data</h2>
                {/* Add your input fields and details here */}
                <div className="Accepteren-Afwijzen-Container">
                  <button
                    className="Accepteren"
                    onClick={this.handleAccepterenClick}
                  >
                    Accepteren
                  </button>
                  <button
                    className="Afwijzen"
                    onClick={this.handleAfwijzenClick}
                  >
                    Afwijzen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Modal/Pop-up */}
        {this.state.isUserModalOpen && (
          <div>
            <div className="modal-overlay"></div>
            <div className="modal-container">
              <span className="sluiten" onClick={this.closeModal}>
                &times;
              </span>
              <h2 className="Otitel">User Data</h2>
              {/* Add your input fields and details here */}
              <div className="Opslaanknop-container">
                <button
                  className="Opslaanknop"
                  onClick={this.handleAddButtonClick}
                >
                  Opslaan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
