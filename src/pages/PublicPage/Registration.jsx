import { Box, VStack, Text, FormControl, FormLabel, Input, Button, Alert, AlertIcon, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Registration() {

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name] : value })
    }

    // Fungsi untuk mengatur nilai form data menjadi kosong
    const dataKosong = () => ({
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const handleSubmit = (e) => {
    e.preventDefault();

    const isInvalid = 
      !formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword;
    if (isInvalid) {
        setError("Please fill all the required fields");
        return;
        }

    if (formData.firstName.length < 3) {
        setError("First Name must be at least 3 characters long")
        return;
        }

    if (formData.lastName.length < 3) {
        setError("Last Name must be at least 3 characters long")
        return;
        }
        
    if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
        } else if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
        } else {
            // Simpan data registrasi ke local storage
            localStorage.setItem('registrationData', JSON.stringify(formData));
            // menampilkan data registrasi pada console
            alert("Registration successful");
            console.log("data : ", formData);
            // Setel nilai formData menjadi kosong dengan menggunakan fungsi dataKosong
            setFormData(dataKosong());
            // Hapus pesan kesalahan
            setError("");
        }
    }

  return (
    <div className="flex h-screen justify-center items-center mt-20 md:mt-5 lg:mt-5 mb-20 md:mb-5 lg:mb-5">
    <div className="rounded-lg shadow-xl">
        <Box p={8}>
            <VStack spacing={4} align="stretch">
            <Text fontSize="3xl" fontWeight={500}>Registration</Text>
            {
            error && (
                <Alert status="error">
                    <AlertIcon/>
                    {error}
                </Alert>
                )
            }
            <form onSubmit={handleSubmit}>
                <Grid
                    // di layar kecil 1 row 1 colom, di layar md keatas 1 row 2 colom
                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} 
                    // Jarak antara setiap sel grid adalah 4 piksel
                    gap={4}
                >
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <FormControl>
                    <FormLabel mb={2}>First Name</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      required
                      onChange={handleInputChange} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <FormControl>
                    <FormLabel mb={2}>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      required
                      onChange={handleInputChange} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <FormControl>
                    <FormLabel mb={2}>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      required
                      onChange={handleInputChange} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <FormControl>
                    <FormLabel mb={2}>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      required
                      onChange={handleInputChange} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <FormControl>
                    <FormLabel mb={2}>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      required
                      onChange={handleInputChange} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <FormControl>
                    <FormLabel mb={2}>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      required
                      onChange={handleInputChange} />
                  </FormControl>
                </GridItem>
                </Grid>

                <Box marginTop={8} textAlign="center">
                    <Button type="submit" colorScheme="blue" width="50%">Submit</Button>
                </Box>
            </form>
            <div className="text-center pt-1">
                <p>Already have an account? 
                    <span className="text-blue-500"><Link to="/login"> Login now</Link></span>
                </p>
            </div>
            </VStack>
        </Box>
    </div>    
    </div>
  )
}

export default Registration;