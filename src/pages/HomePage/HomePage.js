import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import styles from "./HomePage.module.scss";
import cx from "classnames";
import { AppContext } from "../../context";

const HomePage = () => {
  const { isMobile } = useContext(AppContext);

  return (
    <Card
      titleComponent={
        <h1
          className={cx(styles.title, {
            [styles.titleMob]: isMobile,
          })}
        >
          Welcome to Our Bank
        </h1>
      }
    >
      <p
        className={cx(styles.description, {
          [styles.descriptionMob]: isMobile,
        })}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula
        cursus leo, nec vehicula odio bibendum a. Sed dictum arcu et mi commodo,
        vitae malesuada tortor cursus. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; Vivamus in lorem felis.
      </p>
      <p
        className={cx(styles.description, {
          [styles.descriptionMob]: isMobile,
        })}
      >
        Morbi sit amet suscipit lorem. Proin vel velit dignissim, dictum justo
        non, cursus lectus. Duis consequat dui non libero bibendum, non dictum
        lectus fringilla. Phasellus a mi nunc. Nulla facilisi. Sed congue
        vehicula sem, sit amet consequat dolor accumsan id.
      </p>
      <p
        className={cx(styles.description, {
          [styles.descriptionMob]: isMobile,
        })}
      >
        Vestibulum euismod, justo at sollicitudin fermentum, erat orci egestas
        velit, ac ullamcorper felis sapien nec nisi. Aenean suscipit odio ac
        magna dapibus, a ultrices libero tempus. Integer malesuada risus at dui
        viverra pharetra. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas.
      </p>
    </Card>
  );
};

export default HomePage;
