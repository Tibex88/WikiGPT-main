import { create } from 'zustand'


var characters=["walter-white.png",
                "neo.png",
                "gizmo.png",
                "na'vi-avatar.png",
                "pennywise.png",
                "anonymous-mask.png",
                "venom-head.png",
                "black-panther-mask.png",
                "captain-america.png",
                "groot.png",
                "spider-man-head.png",
                "iron-man.png",
                "super-mario.png",
                "joker-dc.png",
                "stich.png",
                "morty-smith.png",
                "rick-sanchez.png",
                "yoda.png",
                "money-heist-dali.png",
                "naruto.png",
                "harry-potter.png",
                ]

const min = 0;
const max = 20;

const useProfileStore = create((set) => ({
  picture:0,
  characters,
  togglePicture: () => set(() => ({ picture: Math.floor(Math.random() * (max - min)) + min })),
}))

export default useProfileStore