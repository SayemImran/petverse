"use client";
import { Sparkles, TrashBin } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import React from "react";

const RequestModal = ({ requester, reqEmail, pickupDate, message }) => {
  return (
    <Modal>
      <Button className="text-green-400 bg-transparent outline-none border border-green-400/30">requests</Button>
      <Modal.Backdrop
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        variant="blur"
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-lg relative z-50">
            <div className="rounded-2xl border bg-slate-950/90 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-5 border-b border-white/6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/8 backdrop-blur-md border border-white/8">
                  <Sparkles className="size-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Review Request</h3>
                  <p className="text-sm text-white/70">Review this adoption request and approve or reject.</p>
                </div>
              </div>

              <div className="px-6 py-5 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate/3 p-4 border border-slate/6">
                    <p className="text-xs text-white/60">Requested User</p>
                    <p className="mt-1 text-sm font-medium text-white">{requester}</p>
                    <p className="text-sm text-white/60">{reqEmail}</p>
                  </div>
                  <div className="rounded-xl bg-slate/3 p-4 border border-slate/6">
                    <p className="text-xs text-white/60">Pickup Date</p>
                    <p className="mt-1 text-sm font-medium text-white">{pickupDate || "Not specified"}</p>
                    <p className="text-xs text-white/50 mt-2">Pet: <span className="font-medium text-white/90">{message ? "See message" : "—"}</span></p>
                  </div>
                </div>

                {message && (
                  <div className="rounded-xl bg-slate/3 p-4 border border-slate/6">
                    <p className="text-xs text-white/60">Message</p>
                    <p className="mt-2 text-sm text-white/80">{message}</p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-white/6 bg-gradient-to-t from-white/2">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="flex-1 rounded-2xl text-green-400 bg-transparent outline-none border border-green-400/30"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-2xl  px-4 py-3 font-semibold text-red-400 bg-transparent outline-none border border-red-400/30"
                  >
                    <TrashBin className="inline mr-2" /> Reject
                  </button>
                </div>
              </div>
            </div>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default RequestModal;
