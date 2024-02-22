"use client";
import { useFormStatus } from "react-dom";

export default function EditProfileBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" className="review dark" disabled={formStatus.pending}>
            {formStatus.pending ? "Editing Profile...": "Edit Profile"}
        </button>
    );
}