import * as React from 'react';
import { Github, Medium, Twitter, StackOverflow } from 'styled-icons/fa-brands';
import Subtitle from './Subtitle';

function Header(props: {}) {
  return (
    <div style={styles.titleContainer} className="level">
      <div>
        <h1 className="title">Ahmed Rizwan</h1>
        <Subtitle />
      </div>

      <div style={styles.iconsContainer}>
        <a href="https://github.com/ahmedrizwan" style={styles.link}>
          <Github style={styles.icon} />
        </a>
        <a href="https://medium.com/@ahmedrizwan" style={styles.link}>
          <Medium style={styles.icon} />
        </a>
        <a href="https://twitter.com/sudo_rizwan" style={styles.link}>
          <Twitter style={styles.icon} />
        </a>
        <a
          href="https://stackoverflow.com/users/4090156/sudo-rizwan?tab=profile"
          style={styles.link}
        >
          <StackOverflow style={{ height: 28 }} />
        </a>
      </div>
    </div>
  );
}

const styles = {
  titleContainer: {
    flex: 1
  },
  link: {
    color: '#e81c4f'
  },
  iconsContainer: {},
  icon: {
    height: 28,
    marginRight: 16
  }
};

export default Header;
