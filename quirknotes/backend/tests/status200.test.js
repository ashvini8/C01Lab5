test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    // delete the all notes before each test
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Code here
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(0);
});
  
test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    // delete the all notes before each test
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Code here
    const title1 = "NoteTest1";
    const content1 = "NoteContent1";
    const title2 = "NoteTest2";
    const content2 = "NoteContent2";

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title1,
          content: content1,
        }),
    });    

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title2,
          content: content2,
        }),
    });
    
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(2);

    expect(getAllNotesBody.response[0].title).toBe(title1);
    expect(getAllNotesBody.response[0].content).toBe(content1);
    expect(getAllNotesBody.response[1].title).toBe(title2);
    expect(getAllNotesBody.response[1].content).toBe(content2);
});
  
test("/deleteNote - Delete a note", async () => {
    // Code here
    const title = "NoteTestToDelete";
    const content = "NoteContentToDelete";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

    const postNoteBody = await postNoteRes.json();
    const noteIdToDelete = postNoteBody.insertedId;

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteIdToDelete}`, {
        method: "DELETE",
    });
    const deleteNoteBody = await deleteNoteRes.json();

    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${noteIdToDelete} deleted.`);
    
});
  
test("/patchNote - Patch with content and title", async () => {
    // Code here
    const title = "NoteTitleToPatch";
    const content = "NoteContentToPatch";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteIdToPatch = postNoteBody.insertedId;

    const updatedTitle = "UpdatedTitle";
    const updatedContent = "UpdatedContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToPatch}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: updatedTitle,
        content: updatedContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteIdToPatch} patched.`);

});
  
test("/patchNote - Patch with just title", async () => {
    // Code here
    const title = "NoteTitleToPatch";
    const content = "NoteContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteIdToPatch = postNoteBody.insertedId;

    const updatedTitle = "UpdatedTitle";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToPatch}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: updatedTitle,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteIdToPatch} patched.`);

});
  
test("/patchNote - Patch with just content", async () => {
    // Code here
    const title = "NoteTitle";
    const content = "NoteContentToPatch";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteIdToPatch = postNoteBody.insertedId;

    const updatedContent = "UpdatedContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteIdToPatch}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        content: updatedContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${noteIdToPatch} patched.`);
});
  
test("/deleteAllNotes - Delete one note", async () => {
    // Code here

    // delete the all notes before each test
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const title = "NoteTitleDelete1";
    const content = "NoteContentDelete1";


    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("1 note(s) deleted.");
});
  
test("/deleteAllNotes - Delete three notes", async () => {
    // delete the all notes before each test
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Code here
    const title1 = "NoteTitleDelete1";
    const content1 = "NoteContentDelete1";
    const title2 = "NoteTitleDelete2";
    const content2 = "NoteContentDelete2";
    const title3 = "NoteTitleDelete3";
    const content3 = "NoteContentDelete3";

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title1,
        content: content1,
        }),
    });

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title2,
        content: content2,
        }),
    });

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title3,
        content: content3,
        }),
    });


    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    // Code here

    const title = "NoteTitleColourChange";
    const content = "NoteTitleContentColourChange";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteId = postNoteBody.insertedId;

    const color = "#FF0000";

    const updateNoteColorRes = await fetch(
        `${SERVER_URL}/updateNoteColor/${noteId}`,
        {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            color: color,
        }),
        }
    );
    const updateNoteColorBody = await updateNoteColorRes.json();

    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
    
});