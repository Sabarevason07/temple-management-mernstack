import axios from "axios";
const API_BASE_URL = 'http://localhost:8080'; 

// ************* REGISTER USER **************/
export const registerUser = async (data) => {
  try {
    const response = await axios.post("/auth/register", data);
        
    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ************* LOGIN USER **************/
export const loginUser = async (data) => {
  try {
    const response = await axios.post("/auth/login", data);

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ************* GET USER INFO **************/
export const getUserInfo = async () => {
  try {
    const response = await axios.post(
      "/auth/get-user-info",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ************* APPLY PANDITH ACCOUNT ******************/
export const applyPandithAccount = async (data) => {
  try {
   
    const response = await axios.post("/auth/apply-pandith", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** MARK ALL NOTIFICATIONS AS SEEN **************/
export const markAllNotificationsAsSeen = async (userId) => {
  try {
    const response = await axios.post("/auth/mark-all-notifications-as-seen", {
      userId,
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** DELETE ALL SEEN NOTIFICATIONS **************/
export const deleteAllSeenNotifications = async (userId) => {
  try {
    const response = await axios.post("/auth/delete-all-seen-notifications", {
      userId,
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** GET ALL USERS ***********/
export const getAllUser = async () => {
  try {
    const response = await axios.get("/admin/getAllUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** GET ALL PANDITHS ***********/
export const getAllPandith = async () => {
  try {
    const response = await axios.get("/admin/getAllPandiths", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** CHANGE PANDITH ACCOUNT STATUS ***********/
export const changeAccountStatus = async (pandithId, status) => {
  try {
    const response = await axios.post(
      "/admin/changeAccountStatus",
      { pandithId, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** GET PANDITH INFO ***********/
export const getPandithInfo = async (userId) => {
  try {
    const response = await axios.post("/pandith/get-pandith-info", userId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** PANDITH PROFILE UPDATE ***********/
export const updatePandithProfile = async (data) => {
  try {
    const response = await axios.post("/pandith/update-profile", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ********** GET ALL APPROVED PANDITHS ***********/
export const getAllApprovedPandiths = async () => {
  try {
    const response = await axios.get("/auth/getAllApprovedPandiths");

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ************** GET PANDITH BY ID ****************/
export const getPandithById = async (pandithId) => {
  try {
    const response = await axios.post("/pandith/getPandithById", pandithId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};
//donation form


export const submitDonation = async (donationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/donations`, donationData);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchDonations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/donations`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ************** APPOINTMENT BOOKING ****************/
export const bookingPooja = async (data) => {
  try {
    const response = await axios.post("/auth/book-pooja", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ****** CHECK APPOINTMENT IS AVAILABLE OR NOT ******/
export const bookingAvailability = async (data) => {
  try {
    const response = await axios.post("/auth/booking-availability", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    console.log(err);
  }
};

// ****** GET USER APPOINTMENTS ******/
export const getUserPoojas = async () => {
  try {
    const response = await axios.get("/auth/user-poojas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ****** GET PANDITH APPOINTMENTS ******/
export const getPandithPoojas = async () => {
  try {
    const response = await axios.get("/pandith/pandith-poojas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

// ******* UPDATE ACCOUNT STATUS *******/
export const updatePoojaStatus = async (data) => {
  try {
    const response = await axios.post("/pandith/updatePoojaStatus", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};


export const createDharshan = async (data) => {
  try {
    const response = await axios.post('/api/dharshan/create', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getDharshan = async () => {
  try {
    const response = await axios.get('/api/dharshan');
    return response.data;
  } catch (err) {
    console.error('Failed to fetch Dharshan data:', err);
    throw err;
  }
};

export const updateDharshan = async (id, data) => {
  try {
    const response = await axios.put(`/api/dharshan/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDharshan = async (id) => {
  try {
    const response = await axios.delete(`/api/dharshan/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const blockUser = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/block`, {
      method: 'PUT', // Assuming you use PUT method for blocking
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary headers (e.g., authorization token)
      },
    });

    if (!response.ok) {
      throw new Error('Failed to block user');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};