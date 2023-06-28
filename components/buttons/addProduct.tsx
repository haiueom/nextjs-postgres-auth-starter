'use client';

import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Btn({text}: {text: string}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    return (
        <Button
            loading={loading}
            onClick={() => {
                setLoading(true);
                router.push("/admin/product/add");
            }}
        >
            {text}
        </Button>
    );
}
