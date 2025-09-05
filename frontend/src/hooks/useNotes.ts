import { useQuery, useMutation, gql } from "@apollo/client";

// GraphQL Operations
export const GET_NOTES = gql`
  query GetNotes($search: String) {
    notes(search: $search) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_NOTE = gql`
  query GetNote($id: ID!) {
    note(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String, $content: String) {
    updateNote(id: $id, title: $title, content: $content) {
      id
      title
      content
      updatedAt
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

// Custom Hooks
export function useNotes(search?: string) {
  return useQuery(GET_NOTES, {
    variables: { search: search || undefined },
    errorPolicy: "all",
  });
}

export function useNote(id: string) {
  return useQuery(GET_NOTE, {
    variables: { id },
    skip: !id,
    errorPolicy: "all",
  });
}

export function useCreateNote() {
  return useMutation(CREATE_NOTE, {
    update(cache, { data }) {
      if (data?.createNote) {
        cache.modify({
          fields: {
            notes(existingNotes = []) {
              const newNoteRef = cache.writeFragment({
                data: data.createNote,
                fragment: gql`
                  fragment NewNote on Note {
                    id
                    title
                    content
                    createdAt
                    updatedAt
                  }
                `,
              });
              return [newNoteRef, ...existingNotes];
            },
          },
        });
      }
    },
  });
}

export function useUpdateNote() {
  return useMutation(UPDATE_NOTE)
}

export function useDeleteNote() {
  return useMutation(DELETE_NOTE, {
    update(cache, { data }, { variables }) {
      if (data?.deleteNote && variables?.id) {
        cache.modify({
          fields: {
            notes(existingNotes = [], { readField }) {
              return existingNotes.filter(
                (noteRef: any) => readField("id", noteRef) !== variables.id
              );
            },
          },
        });
      }
    },
  });
}
