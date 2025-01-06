import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const EmailPass = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || '');
    }
  }, []);

  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Re-authenticate user with old password
        signInWithEmailAndPassword(auth, user.email, oldPassword)
          .then(() => {
            // Update the password after successful re-authentication
            user
              .updatePassword(newPassword)
              .then(() => {
                alert('Password updated successfully!');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setIsChangingPassword(false);
              })
              .catch((error) => {
                alert(`Error updating password: ${error.message}`);
              });
          })
          .catch(() => {
            alert('Incorrect old password!');
          });
      } else {
        alert('No user is currently logged in.');
      }
    } else {
      alert('New password and confirm password do not match!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email and Password</Text>

      <View style={styles.emailContainer}>
        <Text style={styles.label}>Registered Email:</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      {!isChangingPassword && (
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => setIsChangingPassword(true)}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      )}

      {isChangingPassword && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePassword}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A3F',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  emailContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#E0F7FA',
    borderRadius: 5,
    padding: 10,
    color: '#000',
    marginBottom: 15,
  },
  changePasswordButton: {
    backgroundColor: '#123264',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#123264',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default EmailPass;
