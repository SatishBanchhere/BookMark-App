import { useContext, useEffect, useState } from "react"
import DeletedModeContext from "../Context APIs/DeleteMode";

export function Bookmarks() {
    const [websiteName, setWebsiteName] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [bookmarks, setBookmarks] = useState([
        { webName: "Leetcode", Link: "https://leetcode.com/" },
        { webName: "YouTube", Link: "https://www.youtube.com/" },
        { webName: "Google", Link: "https://www.google.com/" },
        { webName: "Facebook", Link: "https://www.facebook.com/" },
        { webName: "Twitter", Link: "https://www.twitter.com/" }
    ]);
    const { newBookmark, setnewBookmark } = useContext(DeletedModeContext);

    useEffect(() => {
        const saveBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        if (saveBookmarks && saveBookmarks.length > 0) {
            setBookmarks(saveBookmarks);
        }
    }, [])

    function handleBookmark() {
        if (websiteName.trim() !== '' && websiteLink.trim() !== '') {
            const newBookmark = {
                webName: websiteName,
                Link: websiteLink
            };

            const updatedBookmarks = [...bookmarks, newBookmark];
            setBookmarks(updatedBookmarks);

            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setnewBookmark(c => !c);
            setWebsiteName('');
            setWebsiteLink('');

            alert('Bookmark added');
        } else {
            alert('Please enter both a website name and link.');
        }
    }

    return (
        <div className="bg-blue-300 text-center"> {/* Changed background color to blue-300 */}
            <div>
                <input
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    placeholder="Website Name"
                    className="m-2 border-2 border-black rounded-md px-2 bg-blue-400 placeholder-black focus:outline-none" // Changed input background color to blue-400
                    type="text"
                />
            </div>
            <div>
                <input
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    placeholder="Website Link"
                    className="m-2 border-2 border-black rounded-md px-2 bg-blue-400 placeholder-black focus:outline-none" // Changed input background color to blue-400
                    type="text"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
                <div></div>
                <div
                    className="m-1 border-black border-2 rounded-md bg-blue-600 hover:bg-blue-400 text-white select-none cursor-pointer" // Changed button colors to blue-600 and blue-400 on hover, text color to white
                    onClick={handleBookmark}
                >
                    Add Bookmarks
                </div>
                <div></div>
            </div>
        </div>
    );
}
