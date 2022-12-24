import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";

const Home: NextPage = (props: any) => {
  return (
    <div className={styles.container}>
      {props.k}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ count: number; }> = async (ctx) => {
  const users = await prisma.user.findMany();
  console.log(users)
  const k = users.map(e => e.username)
  return {
    props: {
      k
    },
  };
};

export default Home;

