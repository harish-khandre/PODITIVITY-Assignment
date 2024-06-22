import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.blog.createMany({
    data: [
      {
        title: "The Road Not Taken",
        author: "Robert Frost",
        content:
          "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth; Then took the other, as just as fair, And having perhaps the better claim, Because it was grassy and wanted wear; Though as for that the passing there Had worn them really about the same, And both that morning equally lay In leaves no step had trodden black. Oh, I kept the first for another day! Yet knowing how way leads on to way, I doubted if I should ever come back. I shall be telling this with a sigh Somewhere ages and ages hence: Two roads diverged in a wood, and I— I took the one less traveled by, And that has made all the difference.",
        thumbnail:
          "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        title: "Fire & Ice",
        author: "Robert Frost",
        content:
          "Some say the world will end in fire, Some say in ice. From what I’ve tasted of desire I hold with those who favor fire. But if it had to perish twice, I think I know enough of hate To say that for destruction ice Is also great And would suffice.",
        thumbnail:
          "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "The Raven",
        author: "Edgar Allan Poe",
        content:
          "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore— While I nodded, nearly napping, suddenly there came a tapping, As of some one gently rapping, rapping at my chamber door. “’Tis some visitor,” I muttered, “tapping at my chamber door— Only this and nothing more.”",
        thumbnail:
          "https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "The Tell-Tale Heart",
        author: "Edgar Allan Poe",
        content:
          "True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily—how calmly I tell you the whole story.",
        thumbnail:
          "https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        content:
          "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since. “Whenever you feel like criticizing any one,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.”",
        thumbnail:
          "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        content:
          "If you really want to hear about it, the first thing you’ll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don’t feel like going into it, if you want to know the truth.",
        thumbnail:
          "https://images.pexels.com/photos/1109352/pexels-photo-1109352.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "1984",
        author: "George Orwell",
        content:
          "It was a bright cold day in April, and the clocks were striking thirteen.",
        thumbnail:
          "https://images.pexels.com/photos/795693/pexels-photo-795693.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        content:
          "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem’s fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh. He couldn’t have cared less, so long as he could pass and punt.",
        thumbnail:
          "https://images.pexels.com/photos/2123337/pexels-photo-2123337.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        content:
          "It is a truth universally acknowledged that a single soul in possession of a good fortune must be in want of a wife.",
        thumbnail:
          "https://images.pexels.com/photos/19802887/pexels-photo-19802887/free-photo-of-power-cables-on-a-railway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
