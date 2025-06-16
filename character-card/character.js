
    const character = {
        name: "Snortleblat",
        class: "Swamp Beat Diplomat",
        level: 5,
        health: 100,
        image: 'https://andejuli.github.io/wdd131/character_card/snortleblat.webp',
        attacked() {
          if (this.health >= 20) {
            this.health -= 20;
            return "Snortleblat was attacked!";
          } else {
            alert('Character Died');
            return "Snortleblat has fallen.";
          }
        },
      
        levelUp() {
          this.level += 1;
          this.health += 20;
          return "Snortleblat leveled up!";
        }
      };
      
      const imageEl = document.querySelector('.image');
      const nameEl = document.querySelector('.name');
      const classEl = document.getElementById('class');
      const levelEl = document.getElementById('level');
      const healthEl = document.getElementById('health');
      const logEl = document.getElementById('log');
      
      function updateCard() {
        imageEl.src = character.image;
        imageEl.alt = character.name;
        nameEl.textContent = character.name;
        classEl.textContent = character.class;
        levelEl.textContent = character.level;
        healthEl.textContent = character.health;
      }
    
      document.getElementById('attacked').addEventListener('click', () => {
        const message = character.attacked();
        updateCard();
        logEl.textContent = message;
      });
      
      document.getElementById('levelup').addEventListener('click', () => {
        const message = character.levelUp();
        updateCard();
        logEl.textContent = message;
      });
      
      updateCard();