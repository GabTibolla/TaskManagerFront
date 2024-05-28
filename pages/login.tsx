import usuarioService from '@/services/usuarioService';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [CPF, setCPF] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('CPF:', CPF);

        usuarioService.getUsuarioLogin(email, CPF).then((response) => {
            console.log('Usuario logado:', response);
            window.location.href = '/home';
        }).catch((error) => {
            console.error('Erro ao logar o usuario:', error);
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h1 style={styles.title}>Login</h1>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="email">Email: </label>
                    <input
                        style={styles.input}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="CPF">CPF: </label>
                    <input
                        style={styles.input}
                        type="text"
                        id="CPF"
                        value={CPF}
                        onChange={(e) => setCPF(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    form: {
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: '1rem',
        textAlign: 'center' as const,
    },
    inputGroup: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
    },
    label: {
        alignSelf: 'flex-start',
        marginRight: '5px',
    },
    input: {
        textAlign: 'right' as const,
        border: '1px solid gray',
        flex: 1,
        maxWidth: '150px', // Define um tamanho máximo para os inputs
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
};

export default LoginForm;
