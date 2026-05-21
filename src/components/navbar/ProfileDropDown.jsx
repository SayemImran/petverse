"use client";
import { signOut } from "@/app/lib/auth-client";
import { Button, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const ProfileDropDown = ({user}) => {

  const router = useRouter();
  return (
    <div>
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
         <Image src={user?.image} alt="User avatar" width={30} height={30} />
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <Label>Dashboard</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="logout"
              textValue="logout"
              variant="danger"
              onClick={async () => {
                await signOut();
                router.refresh();
              }}
            >
              <Label>Logout</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
};

export default ProfileDropDown;
