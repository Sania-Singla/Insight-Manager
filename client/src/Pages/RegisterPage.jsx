import { useState } from 'react';
import { authService } from '../Services';
import { useUserContext } from '../Context';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../Components';
import { verifyExpression, fileRestrictions } from '../Utils';
import { LOGO } from '../Constants/constants';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        avatar: null,
        coverImage: null,
    });

    const [error, setError] = useState({
        root: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        avatar: '',
        coverImage: '',
    });
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    async function handleChange(e) {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    async function handleFileChange(e) {
        const { name, files } = e.target;
        if (files && files[0]) {
            setInputs((prev) => ({ ...prev, [name]: files[0] }));
            fileRestrictions(files[0], name, setError);
        } else {
            name === 'avatar'
                ? setError((prevError) => ({
                      ...prevError,
                      avatar: 'avatar is required.',
                  }))
                : setError((prevError) => ({ ...prevError, coverImage: '' }));
        }
    }

    const handleBlur = (e) => {
        let { name, value } = e.target;
        if (value) {
            verifyExpression(name, value, setError);
        }
    };

    function onMouseOver() {
        if (
            Object.entries(inputs).some(
                ([key, value]) =>
                    !value && key !== 'coverImage' && key !== 'lastName'
            ) ||
            Object.entries(error).some(
                ([key, value]) => value !== '' && key !== 'root'
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setDisabled(true);
        try {
            const res = await authService.register(inputs);
            if (res && !res.message) {
                setUser(res);
                navigate('/');
            } else {
                setError((prev) => ({ ...prev, root: res.message }));
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setDisabled(false);
            setLoading(false);
        }
    }

    /* creating the input fields */

    const inputFields = [
        {
            type: 'text',
            name: 'userName',
            label: 'Username',
            placeholder: 'Enter user name',
            required: true,
        },
        {
            type: 'text',
            name: 'firstName',
            label: 'FirstName',
            placeholder: 'Enter first name',
            required: true,
        },
        {
            type: 'text',
            name: 'lastName',
            label: 'LastName',
            placeholder: 'Enter last name',
            required: false,
        },
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Enter email',
            required: true,
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Create password',
            required: true,
        },
    ];

    const fileFields = [
        {
            name: 'avatar',
            label: 'Avatar',
            required: true,
        },
        {
            name: 'coverImage',
            label: 'CoverImage',
            required: false,
        },
    ];

    const inputElements = inputFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-white z-[1] ml-3 px-2 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label} :
                </label>
            </div>
            <div>
                <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={inputs[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className="shadow-md shadow-[#f7f7f7] py-[15px] rounded-[5px] pl-[10px] w-full border-[0.01rem] border-gray-500 bg-transparent"
                />
            </div>
            {error[field.name] && (
                <div className="mt-1 text-red-500 text-sm font-medium">
                    {error[field.name]}
                </div>
            )}
            {field.name === 'password' && !error.password && (
                <div className="text-xs">password must be 8-12 characters.</div>
            )}
        </div>
    ));

    const fileElements = fileFields.map((field) => (
        <div key={field.name} className="w-full">
            <div className="bg-white z-[1] ml-3 px-2 w-fit relative top-3 font-medium">
                <label htmlFor={field.name}>
                    {field.required && <span className="text-red-500">* </span>}
                    {field.label} :
                </label>
            </div>
            <div>
                <input
                    type="file"
                    name={field.name}
                    id={field.name}
                    onChange={handleFileChange}
                    className="shadow-md shadow-[#f7f7f7] py-[15px] rounded-[5px] pl-[10px] border border-gray-500 w-full"
                />
            </div>
            {error[field.name] && (
                <div className="text-red-500 text-sm mt-1 font-medium">
                    {error[field.name]}
                </div>
            )}
        </div>
    ));

    return (
        <div className="py-10 text-black flex flex-col items-center justify-start gap-4 overflow-y-scroll z-[1] bg-white fixed inset-0">
            <Link
                to={'/'}
                className="w-full flex items-center justify-center hover:brightness-95"
            >
                <div className="overflow-hidden rounded-full size-[90px] drop-shadow-md">
                    <img
                        src={LOGO}
                        alt="peer connect logo"
                        className="object-cover size-full"
                    />
                </div>
            </Link>
            <div className="w-fit">
                <p className="text-center px-2 text-[28px] font-medium">
                    Create a new Account
                </p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="relative -top-2 h-[0.05rem] bg-[#333333]"
                />
                <p className="w-full text-center text-[16px]">
                    already have an Account ?{' '}
                    <Link
                        to={'/login'}
                        className="text-[#355ab6] hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>

            <div className="w-[400px] flex flex-col items-center justify-center gap-3">
                {error.root && (
                    <div className="text-red-500 w-full text-center">
                        {error.root}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-start justify-center gap-4 w-full"
                >
                    {inputElements}

                    {fileElements}

                    <div className="w-full">
                        <Button
                            className="text-white rounded-md py-2 mt-4 text-lg w-full bg-[#4977ec] hover:bg-[#3b62c2]"
                            disabled={disabled}
                            onMouseOver={onMouseOver}
                            btnText={loading ? 'Signing Up...' : 'Sign Up'}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
