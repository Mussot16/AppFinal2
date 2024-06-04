export const updateUser = async (user) => {
    const updatedUserJson = JSON.stringify({
      id: user.id,
      fullName: user.name,
      email: user.email,
      address: user.address,
      profession: user.profession,
      phoneNumber: user.phoneNumber,
    });
  
    try {
      const response = await fetch(
        `https://a4b3-187-190-138-154.ngrok-free.app/api/User/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: updatedUserJson,
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };