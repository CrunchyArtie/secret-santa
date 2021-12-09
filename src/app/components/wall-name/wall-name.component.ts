import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {LetterType} from '../../models/letter.type';
import {Letter} from '../../models/letter';
import {UpperCase} from '../../decorators/upper.case';

const AVAILABLE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ROWS_LIMIT = 4;
const COLORS = [
  'red',
  'yellow',
  'blue',
  'pink',
  'green'
]

@Component({
  selector: 'app-wall-name',
  templateUrl: './wall-name.component.html',
  styleUrls: ['./wall-name.component.scss']
})
export class WallNameComponent implements OnInit {

  @UpperCase()
  @Input() name = '';
  public wall: Letter[] = [];

  public ngOnInit(): void {
    this.generateWall();
  }

  public getClass(letter: Letter) {
    let active = 'dummy-letter';
    if (letter.type === LetterType.active) {
      active = 'active-letter'
    }

    const colorAnimated = letter.color+ '-' + letter.timing;
    const isActive = active
    const isDead = letter.isDead ? 'dead' : '';
    return  [colorAnimated, isActive, isDead]
  }

  private generateWall(): void {
    const limit = this.getNumberOfNeededLetters();
    this.fillWallWithEmptyValues(this.wall, limit)
    this.dispatchTheNameInAWall(this.wall, this.name);
    this.fillTheEmptyValuesOfTheWall(this.wall)

    this.wall.filter(l => l.type === LetterType.dummy).forEach((l, index) => {
      setTimeout(() => l.isDead = true, (index + 3) * 1500)
    })

    // setTimeout(() => this.dummyLightsAreDead = true, 7*1000)
  }

  private dispatchTheNameInAWall(wall: Letter[], name: string): Letter[] {
    // combien d'espace entre les lettres pour répartir ou de combien de case a accès une lettre pour être sûr qu'elles
    // soient réparties et ne s'écrase pas entre elles
    const howManyCasesPerLetters = Math.floor(wall.length / name.length);
    // Combien de cases ne sont pas utilisées et servent juste à avoir un compte rond
    let availableOffset = wall.length - name.length * howManyCasesPerLetters;
    // Position dans le mur de la derniere lettre (-1 = pas de lettre précédemment posée)
    let lastLetterPosition = -1;
    name.split('').forEach((letter, index) => {
      // Premier case à droite de la dernière lettre
      const nextToTheLastLetter = (lastLetterPosition + 1); // (-1+1)=0 | 4
      // Là jusqu'où la dernière lettre pouvait se poser
      const limitOfTheLastLetter = index * howManyCasesPerLetters; // (0*6)=0 | 1*6=6
      // nombre de cases disponible dans la dernière ligne
      const lastLineAvailablePlaces = limitOfTheLastLetter - nextToTheLastLetter; //(0+0)=0 | 6-4=2
      // nombre de cases disponible pour la lettre actuelle (nombre acceptable + les libres de la précédente ligne)
      const availableLimit = lastLineAvailablePlaces + howManyCasesPerLetters; // (0+6)=6 | 2+6=8
      // position dans son ensemble acceptable de 0 au max de case dispo (relative a la derniere lettre, pas au tableau)
      const letterRelativePosition = Math.floor(Math.random() * (availableLimit)); // (0.5*6)=3 | 0.1*8=0
      // On ajoute la place de la derniere lettre pour etre relatif au tableau
      const letterAbsolutePosition = nextToTheLastLetter + letterRelativePosition // (0+3)=3 | 0+4=4

      // là on va tricher, on va répartir de facon aléatoire l'offset entre les lettres
      const currentOffset = Math.floor(Math.random() * availableOffset);
      // On ajoute le potentiel offset
      const letterAbsolutePositionWithOffset = letterAbsolutePosition + currentOffset
      // On retire la meme valeur du nombre d'offset dispo
      availableOffset -= currentOffset;

      wall[letterAbsolutePositionWithOffset] = {
        label: letter,
        type: LetterType.active,
        color: wall[letterAbsolutePositionWithOffset].color,
        timing: wall[letterAbsolutePositionWithOffset].timing,
        isDead: false
      };
      lastLetterPosition = letterAbsolutePositionWithOffset; // 3 | 4
    });

    return wall;
  }

  private howManyRedondantsLetters(str: string): number {
    return str.split('')
      .filter((item, pos, self) => self.indexOf(item) !== pos)
      .length
  }

  private getNumberOfNeededLetters(): number {
    // Nombre de lettres fourre-tout à afficher de base
    const initialLimit = AVAILABLE_LETTERS.length;
    // Nombre de lettres à au moins doubler
    const redondantsLetters = this.howManyRedondantsLetters(this.name);
    // Nombre de lettres nécessaire mini
    const notAccurateLimit = initialLimit + redondantsLetters;
    // Nombre de lettres à ajouter pour avoir un compte rend
    const missLetters = ROWS_LIMIT - (notAccurateLimit % ROWS_LIMIT);

    return notAccurateLimit + missLetters;
  }

  private fillWallWithEmptyValues(wall: Letter[], limit: number): void {
    let availableColors: string[] = []

    for (let i = 0; i < limit; i++) {
      if (availableColors.length === 0) {
        availableColors = _.shuffle(COLORS.slice())
      }

      if (availableColors.length === 0)
        throw new Error('Colors cannot be empty');

      wall.push({
        label: '',
        type: LetterType.dummy,
        // @ts-ignore
        color: availableColors.shift(),
        timing: 75 + Math.floor(Math.random()*225)
      })
    }
  }

  private fillTheEmptyValuesOfTheWall(wall: Letter[]): void {
    const usedLetters = wall.map(l => l.label).filter(l => l !== '');
    const currentlyAvailableLetters = AVAILABLE_LETTERS.split('').filter(a => !usedLetters.includes(a));
    const howManyMoreLettersToAdd = wall.length - currentlyAvailableLetters.length + usedLetters.length
    const aLittleMore = _.shuffle(AVAILABLE_LETTERS.split('').slice(0, howManyMoreLettersToAdd))
    currentlyAvailableLetters.push(...aLittleMore);
    const randomAvailableLetters = _.shuffle(currentlyAvailableLetters);

    wall.filter(l => l.label === '').forEach((letter) => {
      let dummyLetter = randomAvailableLetters.shift();
      if (!dummyLetter) {
        throw new Error('No available letter for dummy filled wall');
      }

      letter.label = dummyLetter
    })
  }
}
