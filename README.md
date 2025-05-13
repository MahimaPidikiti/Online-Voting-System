# 🗳️ Online Voting System

A secure and interactive online voting system that ensures users can vote only once. It allows users to enter their details, verifies them, and only allows voting if the details match. The system provides real-time updates on vote counts.

## Features

- **User Verification**: Users are required to enter their personal details (Name, Email, Voter ID) before voting. If the details match the stored records, they are prevented from voting again.
- **Real-Time Vote Updates**: Vote counts automatically refresh every 5 seconds, ensuring up-to-date results for all participants.
- **Secure Voting**: Prevents multiple votes from the same user based on their details.
- **Responsive UI**: Modern and user-friendly interface built with HTML, CSS, and JavaScript.
- **Backend API**: Built with Node.js and Express to handle vote submission, user verification, and result retrieval.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON file (or can be extended to a database)
- **Real-Time Updates**: Auto-refresh for vote counts
- **Security**: LocalStorage for voter tracking, in-memory vote storage

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/MahimaPidikiti/Online-Voting-System.git
cd online-voting-system
