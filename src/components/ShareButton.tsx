import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";

interface ShareButtonProps {
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url }: ShareButtonProps) => {
  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <span className="bg-gray-300 hover:bg-gray-400 text-black flex items-center justify-center w-8 h-8 p-0 rounded-full">
          <FaShareAlt className="text-xs" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            handleShare(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
          }
        >
          <FaFacebookF className="mr-2" /> Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            handleShare(`https://twitter.com/intent/tweet?url=${url}`)
          }
        >
          <FaTwitter className="mr-2" /> Twitter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare(`https://wa.me/?text=${url}`)}
        >
          <FaWhatsapp className="mr-2" /> WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare(`https://t.me/share/url?url=${url}`)}
        >
          <FaTelegramPlane className="mr-2" /> Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          <FaCopy className="mr-2" /> Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
