import React, { useState } from 'react';
import './Form.scss';

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf === '') return false; 
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length !== 11 || 
        cpf === "00000000000" || 
        cpf === "11111111111" || 
        cpf === "22222222222" || 
        cpf === "33333333333" || 
        cpf === "44444444444" || 
        cpf === "55555555555" || 
        cpf === "66666666666" || 
        cpf === "77777777777" || 
        cpf === "88888888888" || 
        cpf === "99999999999")
            return false;       
    // Valida 1o digito 
    let add = 0;    
    for (let i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        let rev = 11 - (add % 11);  
        if (rev === 10 || rev === 11)     
            rev = 0;    
        if (rev !== parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;    
    for (let i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev === 10 || rev === 11) 
        rev = 0;    
    if (rev !== parseInt(cpf.charAt(10)))
        return false;       
    return true;   
}

function Form() {
    const [student, setStudent] = useState({
        nome: '',
        cpf: '',
        email: '',
        curso: '',
        periodo: '',
        genero: '',
    });

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validaCPF(student.cpf)) {
            alert('CPF inválido!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erro ao enviar os dados', error);
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <span className='form-title'>Novo Estudante</span>
                    <button type="submit" className='btn-cadastro'>Cadastrar</button>
                </div>

                <div className='form-group'>
                    <label htmlFor='nome' className='form-label'>Nome</label>
                    <input
                        type='text'
                        className='form-input'
                        id='nome'
                        name='nome'
                        placeholder='Ex: Herbert de Souza'
                        value={student.nome}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='cpf' className='form-label'>CPF</label>

                    <input
                        type='text'
                        className='form-input'
                        id='cpf'
                        name='cpf'
                        placeholder='Ex: 111.222.333-44'
                        value={student.cpf}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='email' className='form-label'>Email</label>

                    <input
                        type='text'
                        className='form-input'
                        id='email'
                        name='email'
                        placeholder='Ex: cursinhoherbert@gmail.com'
                        value={student.email}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='curso' className='form-label'>Curso</label>

                    <select className='form-input' id='curso' name='curso' value={student.curso} onChange={handleChange}>
                        <option value="Pré-Vestibular">Pré-Vestibular</option>
                        <option value="Pré-Técnico">Pré-Técnico</option>
                        <option value="Concurso">Concurso</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='periodo' className='form-label'>Periodo</label>

                    <select className='form-input' id='periodo' name='periodo' value={student.periodo} onChange={handleChange}>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Noturno">Noturno</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='genero' className='form-label'>Gênero</label>

                    <select className='form-input' id='genero' name='genero' value={student.genero} onChange={handleChange}>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

            </form>
        </div>
    );
}

export default Form;