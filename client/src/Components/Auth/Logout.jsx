import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext, usePopupContext } from '../../Context';
import { authService } from '../../Services';
import { Button } from '..';

export default function Logout() {
    const [loading, setLoading] = useState(false);
    const { setUser } = useUserContext();
    const { setShowPopup, setPopupText } = usePopupContext();
    const navigate = useNavigate();

    async function handleClick() {
        setLoading(true);
        try {
            const res = await authService.logout();
            if (res && !res.message) {
                setUser(null);
                setPopupText('LogOut Successfull 🙂');
                setShowPopup(true);
            }
        } catch (err) {
            navigate('/servor-error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handleClick}
            disabled={loading}
            btnText={loading ? 'Logging Out...' : 'Logout'}
            className="text-white rounded-md py-[5px] w-[80px] bg-[#4977ec] hover:bg-[#3b62c2]"
        />
    );
}
