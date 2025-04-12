document.getElementById("send-note").addEventListener("click", async () => {

    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;
    const status = document.getElementById("status");

    if (!title || !content) {
        status.textContent = "Vui lòng nhập đầy đủ.";
        return;
    }


    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Lấy ngày hiện tại (yyyy-mm-dd)

    const NOTION_TOKEN = ""; // thay bằng token thật
    const DATABASE_ID = "";   // thay bằng ID thật

    const response = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${NOTION_TOKEN}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
            parent: { database_id: DATABASE_ID },
            properties: {
                "Name": {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                "Date": {
                    date: { start: date }
                }
            },
            children: [
                {
                    object: "block",
                    type: "paragraph",
                    paragraph: {
                        rich_text: [
                            {
                                text: {
                                    content: content
                                }
                            }
                        ]
                    }
                }
            ]
        })
    });

    if (response.ok) {
        status.textContent = "Đã gửi thành công!";
        document.getElementById("note-title").value = "";
        document.getElementById("note-content").value = "";
    } else {
        const error = await response.json();
        status.textContent = "Lỗi: " + (error.message || "Không gửi được.");
    }
});